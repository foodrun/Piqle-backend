import { Router } from 'express';
import { superAdminController } from '../../../controllers/super-admin.controller';
import authMiddleware from '../../../middlewares/auth.middleware';
import isSuperAdmin from '../../../middlewares/isSuperAdmin.middleware';

const superAdminRouter = Router();

superAdminRouter.post('/user-management/add-admin', authMiddleware, isSuperAdmin, superAdminController.addNewAdminUser);

export default superAdminRouter;
