import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { otpService } from '../../../otp.service';
import { ITable, ITables } from '../../../../interfaces/table.interface';
import { NOT_REQUESTED, RESTAURANTS, TABLES } from '../../../../constants';
import { updateTableDocument } from '../../../../helper/updateTableDocument';

interface ITableStatus<T> {
  isActive: boolean;
  tableInformation: T[];
}

class ActivateTableService {
  async initialteTableActivation(restaurantID: string, tableID: string): Promise<unknown> {
    const activateResult = await this.updateUniqueCodeInRestaurantTableCollection(restaurantID, tableID, otpService.generateUniqueCode());
    return activateResult;
  }

  private async checkIfTableExistsAndActive(restaurantID: string, tableID: string, getTableInformation = false): Promise<ITableStatus<unknown>> {
    const result = await dbConfig().collection(RESTAURANTS).doc(restaurantID).collection(TABLES).get();
    const tables = result.docs.map(docs => {
      return docs.data();
    });

    const findRequestedTable = tables.filter((table: ITables) => {
      return table.table.table_key === tableID;
    });
    if (findRequestedTable.length < 1) throw new HttpException(400, 'Table Not Found');

    const tableOTP = findRequestedTable[0].table.tableOTP;
    const isActive = isTableOTPGreaterThanZero(tableOTP);

    if (getTableInformation) {
      return { isActive: isActive, tableInformation: (findRequestedTable as unknown) as ITableStatus<ITable> };
    }

    if (!getTableInformation) {
      return { isActive: isActive, tableInformation: (NOT_REQUESTED as unknown) as ITableStatus<string> };
    }
  }

  private async updateUniqueCodeInRestaurantTableCollection(restaurantID: string, tableID: string, uniquelyGeneratedCode: number) {
    const status = await this.checkIfTableExistsAndActive(restaurantID, tableID, false);
    if (status.isActive) throw new HttpException(403, 'Action Forbidden - Table Active');
    const result = await dbConfig()
      .collection(RESTAURANTS)
      .doc(restaurantID)
      .collection(TABLES)
      .doc(tableID)
      .update({ 'table.tableOTP': uniquelyGeneratedCode });
    return result;
  }

  public async OTPCompareWithDB(restaurantID: string, tableID: string, otp: number) {
    const tableStatusAndInformation = await this.checkIfTableExistsAndActive(restaurantID, tableID, true);
    const tableOTP = tableStatusAndInformation.tableInformation.some((table: ITables) => table.table.tableOTP === otp);
    if (tableOTP) await updateTableDocument(restaurantID, tableID, 'table.tableOccupied', true);
    return { success: tableOTP };
  }
}

const isTableOTPGreaterThanZero = (otp: number) => {
  if (otp > 0) return true;
  return false;
};

export const activateTableService = new ActivateTableService();
