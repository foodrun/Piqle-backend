import { NextFunction, Response, Request } from 'express';
import HttpException from '../../../exceptions/HttpException';

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const userGroups = res.locals.user['cognito:groups'];
  if (userGroups.includes('admins')) {
    next();
  } else {
    next(new HttpException(403, 'Unauthorized - Not an admin'));
  }
};

export default isAdmin;
