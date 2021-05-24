import { NextFunction, Request, Response } from 'express';
import { IRestaurantAdminDetails } from '../interfaces/restaurant-admin.interface';
import { superAdmin } from '../services/SuperAdminService/SuperAdmin.service';

class SuperAdminController {
  public addNewAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IRestaurantAdminDetails;
    try {
      const response = await superAdmin.addNewRestaurantAdmin(user);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export const superAdminController = new SuperAdminController();
