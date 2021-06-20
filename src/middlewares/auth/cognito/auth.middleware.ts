import { NextFunction, Response, Request } from 'express';
import CognitoExpress from 'cognito-express';

import HttpException from '../../../exceptions/HttpException';
import { config } from '../../../config/app.config';

const cognitoExpress = new CognitoExpress({
  region: config.AUTH.region,
  cognitoUserPoolId: config.AUTH.cognitoUserPoolId,
  tokenUse: config.AUTH.tokenUse,
  tokenExpiration: parseInt(config.AUTH.tokenExpiration),
});

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.headers;
  if (token) {
    cognitoExpress.validate(token, (err: string, response: any) => {
      if (err) {
        next(new HttpException(401, err));
      } else {
        res.locals.user = response;
        next();
      }
    });
  } else {
    next(new HttpException(401, 'Unauthorized - no token'));
  }
};

export default authMiddleware;
