import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { IRestaurantAdminDetails } from '../interfaces/restaurant-admin.interface';
import { superAdmin } from '../services/SuperAdminService/SuperAdmin.service';

class SuperAdminController {
  public addNewAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IRestaurantAdminDetails;
    console.log(user);
    try {
      const response = await superAdmin.addNewRestaurantAdmin(user);
      res.status(200).send(response);
    } catch (error) {
      if (error.message === 'User account already exists') throw new HttpException(400, error.message);
      console.log(error);
      next(error);
    }
  };
}

export const superAdminController = new SuperAdminController();
