import { NextFunction, Request, Response } from 'express';
import { config } from '../config/app.config';
import { IStatus, ITableActivateBody } from '../interfaces/common.interface';
import { IGAuth } from '../interfaces/gAuth.interface';
import { QRCodeGenerator } from '../services/qrCode.service';
import { tableService } from '../services/RestaurantService/TableService/table.service';

class TableController {
  public verifyTableOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, tableID, otp } = <ITableActivateBody>req.body;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, user_id, phone_number } = <IGAuth>res.locals.gAuth;
      const tableOTPVerificationStatus = <IStatus>(
        await tableService.verifyUserSessionOTPAndActivateTableIfMatched(
          restaurantID,
          tableID,
          parseInt(otp),
          user_id,
          name,
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

  public generateQRAndUpdateDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, tableID } = <{ restaurantID: string; tableID: string }>req.body;
      const qrURL = `${config.QR_SERVICE.url}?size=${config.QR_SERVICE.size_height}x${config.QR_SERVICE.size_width}&data=${config.QR_SERVICE.food_run_url}/restaurant/${restaurantID}/table/${tableID}`;
      const QRService = new QRCodeGenerator(restaurantID, tableID, qrURL);
      await QRService.generateAndUploadTableQR();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export const tableController = new TableController();
