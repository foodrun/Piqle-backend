import { NextFunction, Request, Response } from 'express';
import { ADMINS } from '../constants';
import HttpException from '../exceptions/HttpException';
import { IAddUser } from '../interfaces/User.interface.ts';
import { superAdmin } from '../services/SuperAdminService/SuperAdmin.service';

class SuperAdminController {
  public addNewAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IAddUser;
    if (user.group !== ADMINS) user['group'] = ADMINS;
    try {
      const response = await superAdmin.addNewRestaurantAdmin(user);
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
}

export const superAdminController = new SuperAdminController();
