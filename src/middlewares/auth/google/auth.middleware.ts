import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import HttpException from '../../../exceptions/HttpException';

export const GAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  try {
    if (req.headers && req.headers.token) {
      const isAuthValidInformation = await admin.auth().verifyIdToken(token as string);
      res.locals.gAuth = isAuthValidInformation;
      next();
    } else {
      throw new HttpException(401, 'No Authorization Token Found');
    }
  } catch (error) {
    if (error.code === 'auth/argument-error') {
      next(new HttpException(401, 'Invalid Token Format'));
    }
    if (error.code === 'auth/id-token-expired') {
      next(new HttpException(401, 'Token Expired'));
    } else {
      next(error);
    }
  }
};
