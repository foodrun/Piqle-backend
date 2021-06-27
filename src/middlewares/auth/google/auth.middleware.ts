import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import HttpException from '../../../exceptions/HttpException';
import { Userlogger } from '../../../logger/UserLogger';

export const GAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  try {
    if (req.headers && req.headers.token) {
      const isAuthValidInformation = await admin.auth().verifyIdToken(token as string);
      Userlogger.AddNewLogs(isAuthValidInformation);
      res.locals.gAuth = isAuthValidInformation;
      next();
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
