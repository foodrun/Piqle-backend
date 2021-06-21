import { Router } from 'express';
import { orderController } from '../../../controllers/order.controller';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';
import { CreateOrderValidator } from '../../../middlewares/validator/create-order.validator';

const orderRouter = Router();

orderRouter.post(
  '/order-management/create-new-order',
  // GAuth,
  CreateOrderValidator,
  orderController.createNewTableOrder,
);

export default orderRouter;
