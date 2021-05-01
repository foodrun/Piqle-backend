import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';

const tableRouter = Router();

tableRouter.put('/table/otp', tableController.generateTableOTP);

export default tableRouter;
