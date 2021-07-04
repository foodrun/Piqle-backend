import { Router } from 'express';
import { superAdminController } from '../../../controllers/super-admin.controller';
import { Auth } from '../../../middlewares/auth/basic/auth';
import authMiddleware from '../../../middlewares/auth/cognito/auth.middleware';
import isSuperAdmin from '../../../middlewares/auth/cognito/isSuperAdmin.middleware';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';

const superAdminRouter = Router();

superAdminRouter.post('/user-management/update-user-role', Auth, GAuth, superAdminController.updateUserToSuperAdmin);
superAdminRouter.post('/user-management/add-admin', authMiddleware, isSuperAdmin, superAdminController.addNewAdminUser);

export default superAdminRouter;
