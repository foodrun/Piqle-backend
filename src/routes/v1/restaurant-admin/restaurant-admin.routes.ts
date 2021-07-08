import { Router } from 'express';
import { restaurantAdminController } from '../../../controllers/restaurant-admin.controller';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';
import { IsRestaurantAdminGAuth } from '../../../middlewares/auth/google/authz/restaurantAdmin.middleware';
import { UpdateMenuItemValidator } from '../../../middlewares/validator/menuitem-update.validator';

const restaurantAdminRouter = Router();

restaurantAdminRouter.post(
  '/restaurant-management/add-staff',
  GAuth,
  IsRestaurantAdminGAuth,
  restaurantAdminController.addNewRestaurantStaff,
);

restaurantAdminRouter.put(
  '/restaurant-management/update-menu-item',
  GAuth,
  IsRestaurantAdminGAuth,
  UpdateMenuItemValidator,
  restaurantAdminController.updateRestaurantMenuItem,
);

export default restaurantAdminRouter;
