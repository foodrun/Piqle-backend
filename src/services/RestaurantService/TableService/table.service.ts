import HttpException from '../../../exceptions/HttpException';
import { IStatus } from '../../../interfaces/common.interface';
import { logger } from '../../../utils/logger';
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
    if (!restaurantID || !tableId || !otp) throw new HttpException(400, 'Input Validation Failed');
    if (!memberID || !memberName) {
      logger.error(`Member ID or Member Name missing - memberID: ${memberID}, memberName: ${memberName}`);
      throw new HttpException(400, `Member ID or Member Name missing`);
    }
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
