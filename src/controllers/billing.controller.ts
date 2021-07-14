import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { IGAuth } from '../interfaces/gAuth.interface';
import { IBillRequest } from '../interfaces/orderBill.interface';
import { billingService } from '../services/RestaurantService/BillingService/billing';
import { OrderService } from '../services/RestaurantService/OrderService/order.service';

class BillingController {
  public generateSessionBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderInformation = <IBillRequest>req.body;
      const { restaurantID, sessionID } = orderInformation;
      await billingService.getOrderReferencesFromDB(restaurantID, sessionID);
      await billingService.getIndivisualOrderBill();
      res.status(201).json();
    } catch (_e) {
      next(_e);
    }
  };
}

export const billingController = new BillingController();
