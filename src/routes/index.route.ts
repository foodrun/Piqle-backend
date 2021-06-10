import express from 'express';
const route = express.Router();

import router from './v1/test-routes/test.routes';
import tableRouter from './v1/table-management-routes/table-management.routes';
import superAdminRouter from './v1/super-admin/super-admin.routes';
import restaurantAdminRouter from './v1/restaurant-admin/restaurant-admin.routes';
import orderRouter from './v1/order-management/order.routes';

route.use('/v1/test-route', router);
route.use('/v1/table-management', tableRouter);
route.use('/v1/super-admin-actions', superAdminRouter);
route.use('/v1/restaurant-admin-actions', restaurantAdminRouter);
route.use('/v1/order-actions', orderRouter);

export default route;
