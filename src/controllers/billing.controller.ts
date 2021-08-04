import { NextFunction, Request, Response } from 'express';
// import { IGAuth } from '../interfaces/gAuth.interface';
import { IBillRequest } from '../interfaces/orderBill.interface';
import { BillingService } from '../services/RestaurantService/BillingService/billing';
import { SessionOperations } from '../services/RestaurantService/SessionService/SessionOperations/session-ops.service';

class BillingController {
  public generateSessionBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderInformation = <IBillRequest>req.body;
      const { restaurantID, sessionID } = orderInformation;
      //Check if that user is present in the session
      const billingService = new BillingService();
      await billingService.getOrderReferencesFromDB(restaurantID, sessionID);
      await billingService.getIndivisualOrderBill();
      await billingService.generateFinalBill(restaurantID);
      const bill = billingService.getSessionTotalBill();
      const sessionOperations = new SessionOperations(restaurantID);
      sessionOperations.updateSessionBill(sessionID, bill);
      res.status(201).json();
    } catch (_e) {
      next(_e);
    }
  };
}

export const billingController = new BillingController();
