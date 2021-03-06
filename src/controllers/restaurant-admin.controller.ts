import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { IAddUser } from '../interfaces/common.interface';
import { IGAuth } from '../interfaces/gAuth.interface';
import { IMenuUpdate } from '../interfaces/menu-items.interface';
import { restaurantAdmin } from '../services/RestaurantAdminService/RestaurantAdmin.service';
import { itemsService } from '../services/RestaurantService/ItemsService/items.service';

class RestaurantAdminController {
  public addNewRestaurantStaff = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IAddUser;
    const userInfo = <IGAuth>res.locals.gAuth;
    try {
      const response = await restaurantAdmin.addRestaurantStaffUserAndCustomAttributes(
        userInfo.role.restaurantID,
        user.userName,
        user.password,
      );
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

  public updateTableOccupationStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { restaurantID, tableID, status } = req.body;
      restaurantAdmin.changeTableOccupationStatus(restaurantID, tableID, status);
      res.status(200).json();
    } catch (_e) {
      const error: Error = _e;
      next(error);
    }
  };
}

export const restaurantAdminController = new RestaurantAdminController();
