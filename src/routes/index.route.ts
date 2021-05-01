import express from 'express';
const route = express.Router();

import router from './v1/test-routes/test.routes';
import tableRouter from './v1/table-management-routes/table-management.routes';

route.use('/v1/test-route', router);
route.use('/v1/table-management', tableRouter);

export default route;
