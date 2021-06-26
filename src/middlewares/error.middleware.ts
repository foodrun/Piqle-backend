import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { logger } from '../utils/logger';

interface IUserRequest extends Request {
  id: string;
}

const errorMiddleware = (error: HttpException, req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`StatusCode : ${status}, Message : ${message}, RequestID: ${req.id}`);
    res.status(status).json({ message, requestID: req.id });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
