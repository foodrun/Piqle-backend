import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';

const tableRouter = Router();

tableRouter.post('/table/otp', tableController.generateTableOTP);

export default tableRouter;
