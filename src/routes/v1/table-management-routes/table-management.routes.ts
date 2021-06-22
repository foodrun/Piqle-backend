import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';

const tableRouter = Router();
tableRouter.post('/table/otp/verify', GAuth, tableController.verifyTableOTP);
tableRouter.put('/table/generate/qr', tableController.generateQRAndUpdateDB);

export default tableRouter;
