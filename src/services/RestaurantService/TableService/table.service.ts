import HttpException from '../../../exceptions/HttpException';
import { activateTableService } from './activate/activateTable';

interface IVerificationStatus {
  success: boolean;
}

class TableService {
  public async startUserSession(restaurantID: string, tableId: string, user = 'Test User') {
    if (!restaurantID || !tableId) throw new HttpException(400, 'Input Validation Failed');
    const userSession = await activateTableService.initialteTableActivation(restaurantID, tableId);
    return userSession;
  }

  public async verifyUserSessionOTP(restaurantID: string, tableId: string, otp: number, user = 'Test User'): Promise<any> {
    if (!restaurantID || !tableId || !otp) throw new HttpException(400, 'Input Validation Failed');
    const verifyStatus = await activateTableService.OTPCompareWithDB(restaurantID, tableId, otp);
    return verifyStatus;
  }
}

export const tableService = new TableService();
