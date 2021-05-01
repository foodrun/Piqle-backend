import { NextFunction, Request, Response } from 'express';
import { tableService } from '../services/table.service';

class TableController {
  public generateTableOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tableID, restaurantID } = req.body;
      const tableResult = await tableService.generateTableOTP(tableID, restaurantID);
      res.status(200).json(tableResult);
    } catch (error) {
      next(error);
    }
  };
}

export const tableController = new TableController();
