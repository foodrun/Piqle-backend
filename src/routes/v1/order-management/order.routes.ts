import { Router } from 'express';
import { orderController } from '../../../controllers/order.controller';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';
import { CreateOrderValidator } from '../../../middlewares/validator/create-order.validator';
import { UpdateOrderValidator } from '../../../middlewares/validator/update-order-status.validator';

const orderRouter = Router();

orderRouter.post(
  '/order-management/create-new-order',
  GAuth,
  CreateOrderValidator,
  orderController.createNewTableOrder,
);

orderRouter.post('/order-management/update-order', UpdateOrderValidator, orderController.updateOrderStatus);

export default orderRouter;
