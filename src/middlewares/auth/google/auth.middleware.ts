import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import HttpException from '../../../exceptions/HttpException';

export const GAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  if (!token) throw new HttpException(401, 'No valid auth token found');
  try {
    const isAuthValidInformation = await admin.auth().verifyIdToken(token as string);
    res.locals.gAuth = isAuthValidInformation;
    next();
  } catch (error) {
    console.log(error.code);
    if (error.code === 'auth/id-token-expired') {
      next(new HttpException(401, 'Token Expired'));
    } else {
      next(new HttpException(401, error));
    }
  }
};
