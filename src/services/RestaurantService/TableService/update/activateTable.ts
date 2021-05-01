import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { otpService } from '../../../otp.service';

interface ITable {
  tableNumber: number;
  tableOTP: number;
  tableOccupied: boolean;
}
interface ITables {
  table: ITable;
}
class ActivateTableService {
  async activateTable(restaurantID: string, tableID: number): unknown {
    const activateResult = await this.updateUniqueCodeInRestaurantTableCollection(restaurantID, tableID, otpService.generateUniqueCode());
    return activateResult;
  }

  private async checkIfTableActive(restaurantID: string, tableID: number): void {
    const result = await dbConfig().collection('restaurants').doc(restaurantID).collection('tables').get();
    const tables = result.docs.map(docs => {
      return docs.data();
    });
    const findRequestedTable: ITables[] = tables.filter((table: ITables) => {
      return table.table.tableNumber === tableID;
    });

    if (findRequestedTable[0].table.tableOTP > 0) return true;
    return false;
  }

  private async updateUniqueCodeInRestaurantTableCollection(restaurantID: string, tableID: number, uniquelyGeneratedCode: number) {
    const isActive = await this.checkIfTableActive(restaurantID, tableID);
    if (isActive) throw new HttpException(403, 'Action Forbidden');
  }
}

export const activateTableService = new ActivateTableService();
