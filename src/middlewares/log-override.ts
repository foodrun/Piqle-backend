/* eslint-disable prefer-rest-params */
import { logger } from '../utils/logger';
import { Request, NextFunction, Response, Send } from 'express';
import { Userlogger } from '../logger/UserLogger';
import { IGAuth } from '../interfaces/gAuth.interface';

interface IUserRequest extends Request {
  id: string;
}

export const LogOverRide = (req: IUserRequest, res: Response, next: NextFunction) => {
  const oldSend = res.send;
  res.send = function (data) {
    const { body, id, path } = req;
    const responseSent = data;
    const responseStatus = res.statusCode;
    const userDetails = <IGAuth>Userlogger.GetLogsMetaKey();
    const metaLog = {
      req: {
        body,
        id,
        path,
        user:
          userDetails && userDetails.name && userDetails.phone_number && userDetails.user_id
            ? {
                name: userDetails.name,
                phone_number: userDetails.phone_number,
                user_id: userDetails.user_id,
              }
            : userDetails,
      },
      res: { responseSent: responseSent ? responseSent : 'No Data Defined in Response', responseStatus },
    };
    // logger.log('info', 'Metalogs', metaLog);
    console.log(metaLog);
    oldSend.apply(this, arguments);
  } as Send;
  Userlogger.ResetLogsMetaKey();
  next();
};
