import { NextFunction, Request, Response } from 'express';
import { IStatus, ITableActivateBody } from '../interfaces/common.interface';
import { IGAuth } from '../interfaces/gAuth.interface';
import { tableService } from '../services/RestaurantService/TableService/table.service';

class TableController {
  public verifyTableOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, tableID, otp, memberID, memberName } = <ITableActivateBody>req.body;
      const { name, user_id, phone_number } = <IGAuth>res.locals.gAuth;
      const tableOTPVerificationStatus = <IStatus>(
        await tableService.verifyUserSessionOTPAndActivateTableIfMatched(
          restaurantID,
          tableID,
          parseInt(otp),
          name,
          user_id,
        )
      );
      if (tableOTPVerificationStatus.success === true) {
        res.status(200).json(tableOTPVerificationStatus);
      } else {
        res.status(400).send(tableOTPVerificationStatus);
      }
    } catch (_e) {
      next(_e);
    }
  };
}

export const tableController = new TableController();
