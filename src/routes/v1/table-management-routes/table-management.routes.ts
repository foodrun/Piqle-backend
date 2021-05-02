import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';

const tableRouter = Router();

tableRouter.post('/table/otp', tableController.generateTableOTP);
tableRouter.post('/table/otp/verify', tableController.verifyTableOTP);
//verifyTableOTP

export default tableRouter;
