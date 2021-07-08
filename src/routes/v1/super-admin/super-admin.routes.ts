import { Router } from 'express';
import { superAdminController } from '../../../controllers/super-admin.controller';
import { Auth } from '../../../middlewares/auth/basic/auth';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';

const superAdminRouter = Router();

superAdminRouter.post('/user-management/update-user-role', Auth, GAuth, superAdminController.updateUserToSuperAdmin);

export default superAdminRouter;
