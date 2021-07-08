import { Router } from 'express';
import { restaurantAdminController } from '../../../controllers/restaurant-admin.controller';
import authMiddleware from '../../../middlewares/auth/cognito/auth.middleware';
import isAdmin from '../../../middlewares/auth/cognito/isAdmin.middleware';
import { UpdateMenuItemValidator } from '../../../middlewares/validator/menuitem-update.validator';

const restaurantAdminRouter = Router();

restaurantAdminRouter.post(
  '/restaurant-management/add-staff',
  authMiddleware,
  isAdmin,
  restaurantAdminController.addNewRestaurantStaff,
);

restaurantAdminRouter.put(
  '/restaurant-management/update-menu-item',
  UpdateMenuItemValidator,
  restaurantAdminController.updateRestaurantMenuItem,
);

export default restaurantAdminRouter;
