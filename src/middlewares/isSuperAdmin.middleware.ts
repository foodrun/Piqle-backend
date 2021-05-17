import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';

const isSuperAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const userGroups = res.locals.user['cognito:groups'];
  if (userGroups.includes('foodRunAdmins')) {
    next();
  } else {
    next(new HttpException(403, 'Unauthorized - Not a super admin'));
  }
};

export default isSuperAdmin;