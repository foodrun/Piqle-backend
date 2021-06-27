import { Router } from 'express';
import { superAdminController } from '../../../controllers/super-admin.controller';
import authMiddleware from '../../../middlewares/auth/cognito/auth.middleware';
import isSuperAdmin from '../../../middlewares/auth/cognito/isSuperAdmin.middleware';

const superAdminRouter = Router();

superAdminRouter.post('/user-management/add-admin', authMiddleware, isSuperAdmin, superAdminController.addNewAdminUser);

export default superAdminRouter;
