import { NextFunction, Request, Response } from 'express';
import { IGAuth } from '../interfaces/gAuth.interface';
import { IOrder } from '../interfaces/order.interface';
import { OrderService } from '../services/RestaurantService/OrderService/order.service';

interface IUpdateOrderStatus {
  orderID: string;
  restaurantID: string;
  status: string;
}
class OrderController {
  public createNewTableOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderInformation = <IOrder>req.body;
      const userInformation = <IGAuth>res.locals.gAuth;
      const order = new OrderService(orderInformation);
      const orderID = await order.placeOrder({ memberID: userInformation.user_id, memberName: userInformation.name });
      res.status(201).json(orderID);
    } catch (_e) {
      next(_e);
    }
  };

  public updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantID, orderID, status } = <IUpdateOrderStatus>req.body;
      const order = new OrderService();
      if (await order.updateOrderStatus(restaurantID, orderID, status)) {
        res.status(200).json({ updateStatus: true });
      } else {
        res.status(400).json({ updateStatus: false });
      }
    } catch (error) {
      next(error);
    }
  };
}

export const orderController = new OrderController();
