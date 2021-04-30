import { NextFunction, Request, Response } from 'express';
import { testService } from '../services/test.service';

class TestController {
  public getAllSampleObjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const testObject = testService.getAllObjects();
      res.status(200).json(testObject);
    } catch (error) {
      next(error);
    }
  };
}

export const testController = new TestController();
