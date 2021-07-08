import { Request, Response, NextFunction } from 'express';
import HttpException from '../../../../exceptions/HttpException';
import { IGAuth } from '../../../../interfaces/gAuth.interface';
import { Userlogger } from '../../../../logger/UserLogger';

export const IsRestaurantAdminGAuth = async (req: Request, res: Response, next: NextFunction) => {
  const userInformation = res.locals.gAuth as IGAuth;
  try {
    if (userInformation && userInformation.role) {
      const isRestaurantAdmin = userInformation.role.isRestaurantAdmin;
      if (isRestaurantAdmin) {
        next();
      } else {
        throw new HttpException(403, 'Not a Restaurant Admin');
      }
    } else {
      throw new HttpException(401, 'No Authorization Token Found');
    }
  } catch (error) {
    if (error.code === 'auth/argument-error') {
      Userlogger.AddNewLogs('Invalid Token Format');
      next(new HttpException(401, 'Invalid Token Format'));
    }
    if (error.code === 'auth/id-token-expired') {
      Userlogger.AddNewLogs('Token Expired');
      next(new HttpException(401, 'Token Expired'));
    } else {
      next(error);
    }
  }
};
