import HttpException from '../../../exceptions/HttpException';
import { activateTableService } from './activate/activateTable';

class TableService {
  public async verifyUserSessionOTPAndActivateTableIfMatched(
    restaurantID: string,
    tableId: string,
    otp: number,
    user = 'Test User',
  ): Promise<any> {
    if (!restaurantID || !tableId || !otp) throw new HttpException(400, 'Input Validation Failed');
    const verifyStatus = await activateTableService.activateTable(restaurantID, tableId, otp);
    return verifyStatus;
  }
}

export const tableService = new TableService();
