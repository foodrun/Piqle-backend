import { Router } from 'express';

import { testController } from '../../../controllers/test.controller';

const router = Router();

router.get('/test', testController.getAllSampleObjects);

export default router;
