import { Router } from 'express';
import { restaurantAdminController } from '../../../controllers/restaurant-admin.controller';
import authMiddleware from '../../../middlewares/auth/cognito/auth.middleware';
import isAdmin from '../../../middlewares/auth/cognito/isAdmin.middleware';

const restaurantAdminRouter = Router();

restaurantAdminRouter.post(
  '/restaurant-management/add-staff',
  authMiddleware,
  isAdmin,
  restaurantAdminController.addNewRestaurantStaff,
);

restaurantAdminRouter.put(
  '/restaurant-management/update-menu-item',
  restaurantAdminController.updateRestaurantMenuItem,
);

export default restaurantAdminRouter;
