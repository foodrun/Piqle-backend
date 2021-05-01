import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { otpService } from '../../../otp.service';
import { ITables } from '../../../../interfaces/table.interface';
import { RESTAURANTS, TABLES } from '../../../../constants';

class ActivateTableService {
  async activateTable(restaurantID: string, tableID: string): Promise<unknown> {
    const activateResult = await this.updateUniqueCodeInRestaurantTableCollection(restaurantID, tableID, otpService.generateUniqueCode());
    return activateResult;
  }

  private async checkIfTableExistsAndActive(restaurantID: string, tableID: string): Promise<boolean> {
    const result = await dbConfig().collection(RESTAURANTS).doc(restaurantID).collection(TABLES).get();
    const tables = result.docs.map(docs => {
      return docs.data();
    });

    const findRequestedTable = tables.filter((table: ITables) => {
      return table.table.table_key === tableID;
    });
    if (findRequestedTable.length < 1) throw new HttpException(400, 'Table Not Found');

    if (findRequestedTable[0].table.tableOTP > 0) return true;
    return false;
  }

  private async updateUniqueCodeInRestaurantTableCollection(restaurantID: string, tableID: string, uniquelyGeneratedCode: number) {
    const isActive = await this.checkIfTableExistsAndActive(restaurantID, tableID);
    if (isActive) throw new HttpException(403, 'Action Forbidden - Table Active');
    const result = await dbConfig()
      .collection(RESTAURANTS)
      .doc(restaurantID)
      .collection(TABLES)
      .doc(tableID)
      .update({ 'table.tableOTP': uniquelyGeneratedCode, 'table.tableOccupied': true });
    return result;
  }
}

export const activateTableService = new ActivateTableService();
