import { NextFunction, Response, Request } from 'express';
import { FOOD_RUN_ADMIN } from '../../../constants';
import HttpException from '../../../exceptions/HttpException';

const isSuperAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const userGroups = res.locals.user['cognito:groups'];
  if (userGroups.includes(FOOD_RUN_ADMIN)) {
    next();
  } else {
    next(new HttpException(403, 'Unauthorized - Not a super admin'));
  }
};

export default isSuperAdmin;
