import { Router } from 'express';
import { superAdminController } from '../../../controllers/super-admin.controller';

const superAdminRouter = Router();

superAdminRouter.post('/user-management/add-admin', superAdminController.addNewAdminUser);

export default superAdminRouter;
