import { NextFunction, Request, Response } from 'express';

class SuperAdminController {
  public addNewAdminUser = async (req: Request, res: Response, next: NextFunction) => {};
}

export const superAdminController = new SuperAdminController();
