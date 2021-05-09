import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { RESTAURANTS, TABLES } from '../../../../constants';
import { updateTableDocument } from '../../../../helper/updateTableDocument';

interface ITable {
  tableNumber: number;
  tableOTP: number;
  tableOccupied: boolean;
  tableKey: string;
}
interface ITables {
  table: ITable;
}

interface IStatus {
  success: boolean;
}
interface IActivateTableService {
  activateTable(restaurantID: string, tableID: string, otp: number): Promise<IStatus>;
  getTableIfExists(restaurantID: string, tableID: string): Promise<ITables | HttpException>;
  checkIfTableActive(table: ITables): boolean;
  compareInputOTPWithDbOTP(table: ITables, otp: number): boolean;
}

class ActivateTableService implements IActivateTableService {
  async activateTable(restaurantID: string, tableID: string, otp: number): Promise<IStatus> {
    const tableInformation = <ITables>await this.getTableIfExists(restaurantID, tableID);
    const isTableActive = this.checkIfTableActive(tableInformation);
    if (isTableActive) throw new HttpException(400, 'Bad Request - Table Already Active');
    const doesOTPMatch = this.compareInputOTPWithDbOTP(tableInformation, otp);
    if (doesOTPMatch) {
      await updateTableDocument(restaurantID, tableID, 'table.tableOccupied', true);
      return { success: true };
    }
    return { success: false };
  }

  async getTableIfExists(restaurantID: string, tableID: string): Promise<ITables | HttpException> {
    const tables = await dbConfig().collection(RESTAURANTS).doc(restaurantID).collection(TABLES).get();
    const allRestaurantTableInformation = <ITables[]>tables.docs.map(docs => {
      return docs.data();
    });
    const tableExistsInformation = allRestaurantTableInformation.some(table => table.table.tableKey === tableID);
    if (!tableExistsInformation) throw new HttpException(404, 'Table Does Not Exist');

    const requestedTableInformation = <ITables[]>(
      allRestaurantTableInformation.filter(table => table.table.tableKey === tableID)
    );
    return requestedTableInformation[0];
  }

  checkIfTableActive(table: ITables): boolean {
    const tableOccupiedStatus = table.table.tableOccupied;
    if (tableOccupiedStatus) return true;
    return false;
  }

  compareInputOTPWithDbOTP(table: ITables, otp: number): boolean {
    const doesMatchStatus = table.table.tableOTP === otp;
    if (doesMatchStatus) return true;
    return false;
  }
}

export const activateTableService = new ActivateTableService();
