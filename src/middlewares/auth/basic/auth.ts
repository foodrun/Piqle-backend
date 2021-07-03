import { Request, Response, NextFunction } from 'express';
import { config } from '../../../config/app.config';
import HttpException from '../../../exceptions/HttpException';

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req.headers;
  if (auth === config.application.superAdminAuthKey) {
    console.log(1);
    next();
  } else {
    console.log(2);
    next(new HttpException(401, 'Unauthorized'));
  }
};
