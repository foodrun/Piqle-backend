import { NextFunction, Request, Response } from 'express';
import { IOrder } from '../interfaces/order.interface';

class OrderController {
  public createNewTableOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, tableID, username, order } = <IOrder>req.body;
      console.log(res.locals.gAuth);
      res.status(201).send({ orderID: '1234' });
    } catch (_e) {
      next(_e);
    }
  };
}

export const orderController = new OrderController();
