import express from 'express';
const route = express.Router();

import router from './v1/test-routes/test.routes';

route.use('/v1/test-route', router);

export default route;
