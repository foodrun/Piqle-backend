import { NextFunction, Request, Response } from 'express';
import { GROUPS } from '../constants';
import HttpException from '../exceptions/HttpException';
import { IAddUser } from '../interfaces/common.interface';
import { IMenuUpdate } from '../interfaces/menu-items.interface';
import { restaurantAdminService } from '../services/RestaurantAdminService/RestaurantAdmin.service';
import { itemsService } from '../services/RestaurantService/ItemsService/items.service';

class RestaurantAdminController {
  public addNewRestaurantStaff = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IAddUser;
    if (!GROUPS.includes(user.group)) throw new HttpException(400, 'Not a valid group');
    try {
      const response = await restaurantAdminService.addNewRestaurantAdmin(user);
      res.status(200).send(response);
    } catch (_e) {
      const error: Error = _e;
      if (error.message === 'User account already exists') {
        throw new HttpException(400, error.message);
      } else {
        next(error);
      }
    }
  };

  public updateRestaurantMenuItem = async (req: Request, res: Response, next: NextFunction) => {
    const item = req.body as IMenuUpdate;
    try {
      const response = await itemsService.updateMenuItem(item);
      res.status(200).send(response);
    } catch (_e) {
      const error: Error = _e;
      next(error);
    }
  };
}

export const restaurantAdminController = new RestaurantAdminController();
