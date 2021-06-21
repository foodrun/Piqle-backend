import { NextFunction, Request, Response } from 'express';
import { IGAuth } from '../interfaces/gAuth.interface';
import { IOrder } from '../interfaces/order.interface';
import { OrderService } from '../services/RestaurantService/OrderService/order.service';

class OrderController {
  public createNewTableOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderInformation = <IOrder>req.body;
      const userInformation = <IGAuth>res.locals.gAuth;
      const order = new OrderService(orderInformation);
      const orderID = await order.placeOrder({ memberID: userInformation.user_id, memberName: userInformation.name });
      res.status(201).send(orderID);
    } catch (_e) {
      next(_e);
    }
  };
}

export const orderController = new OrderController();
