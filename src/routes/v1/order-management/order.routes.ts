import { Router } from 'express';
import { orderController } from '../../../controllers/order.controller';
import { CreateOrderValidator } from '../../../middlewares/validator/create-order.validator';

const orderRouter = Router();

orderRouter.post('/order-management/create-new-order', CreateOrderValidator, orderController.createNewTableOrder);

export default orderRouter;
