import HttpException from '../../../exceptions/HttpException';
import { IStatus } from '../../../interfaces/common.interface';
import { ActivateTableService } from './activate/activateTable';

const activateTableService = new ActivateTableService();

class TableService {
  public async verifyUserSessionOTPAndActivateTableIfMatched(
    restaurantID: string,
    tableId: string,
    otp: number,
    memberID: string,
    memberName: string,
  ): Promise<IStatus> {
    if (!restaurantID || !tableId || !otp || !memberID || !memberName)
      throw new HttpException(400, 'Input Validation Failed');
    const verifyStatusAndInformation = await activateTableService.activateTable(
      restaurantID,
      tableId,
      otp,
      memberID,
      memberName,
    );
    return verifyStatusAndInformation;
  }
}

export const tableService = new TableService();
