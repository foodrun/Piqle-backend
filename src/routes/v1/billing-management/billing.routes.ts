import { Router } from 'express';
import { billingController } from '../../../controllers/billing.controller';
import { GAuth } from '../../../middlewares/auth/google/auth.middleware';

const billingRouter = Router();

billingRouter.put('/billing-management/generate-bill-and-update', GAuth, billingController.generateSessionBill);

export default billingRouter;
