import { NextFunction, Request, Response } from 'express';
import { GROUPS } from '../constants';
import HttpException from '../exceptions/HttpException';
import { IAddUser } from '../interfaces/User.interface.ts';
import { restaurantAdminService } from '../services/RestaurantAdminService/RestaurantAdmin.service';

class RestaurantAdminController {
  public addNewRestaurantStaff = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IAddUser;
    if (!GROUPS.includes(user.group)) throw new HttpException(400, 'Not a valid group');
    try {
      const response = await restaurantAdminService.addNewRestaurantAdmin(user);
      res.status(200).send(response);
    } catch (error) {
      if (error.message === 'User account already exists') throw new HttpException(400, error.message);
      console.log(error);
      next(error);
    }
  };
}

export const restaurantAdminController = new RestaurantAdminController();
