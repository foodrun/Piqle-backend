import { NextFunction, Request, Response } from 'express';
import { tableService } from '../services/RestaurantService/TableService/table.service';

class TableController {
  public verifyTableOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, tableID, otp } = req.body;
      const tableOTPVerificationStatus = await tableService.verifyUserSessionOTPAndActivateTableIfMatched(
        restaurantID,
        tableID,
        parseInt(otp),
      );
      res.status(200).json(tableOTPVerificationStatus);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export const tableController = new TableController();
