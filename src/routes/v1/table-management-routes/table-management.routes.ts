import { Router } from 'express';

import { tableController } from '../../../controllers/table.controller';

const tableRouter = Router();

tableRouter.get('/table/otp', tableController.generateTableOTP);

export default tableRouter;
