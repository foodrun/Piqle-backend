import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';

const tableRouter = Router();
//verifyTableOTP
tableRouter.post('/table/otp/verify', GAuth, tableController.verifyTableOTP);

export default tableRouter;
