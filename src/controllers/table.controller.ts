import { NextFunction, Request, Response } from 'express';
import { tableService } from '../services/RestaurantService/TableService/table.service';

class TableController {
  public generateTableOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, tableID } = req.body;
      const tableResult = await tableService.startUserSession(restaurantID, parseInt(tableID));
      res.status(201).json(tableResult);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export const tableController = new TableController();
