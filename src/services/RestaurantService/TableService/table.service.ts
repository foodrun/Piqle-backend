import HttpException from '../../../exceptions/HttpException';
import { activateTableService } from './update/activateTable';

class TableService {
  public startUserSession(restaurantID: string, tableId: number, user = 'Test User') {
    if (!restaurantID || !tableId) throw new HttpException(400, 'Input Validation Failed');
    const activateTable = activateTableService.activateTable(restaurantID, tableId);
    return activateTable;
  }
}

export const tableService = new TableService();
