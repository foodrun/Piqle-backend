import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';

const tableRouter = Router();
//verifyTableOTP
tableRouter.post('/table/otp/verify', tableController.verifyTableOTP);

export default tableRouter;
