import express from 'express';
const route = express.Router();

import router from './v1/test-routes/test.routes';
import tableRouter from './v1/table-management-routes/table-management.routes';
import superAdminRouter from './v1/super-admin/super-admin.routes';

route.use('/v1/test-route', router);
route.use('/v1/table-management', tableRouter);
route.use('/v1/super-admin-actions', superAdminRouter);

export default route;
