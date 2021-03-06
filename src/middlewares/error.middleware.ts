import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

interface IUserRequest extends Request {
  id: string;
}

const errorMiddleware = (error: HttpException, req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
