import { Request, Response, NextFunction } from 'express';
import { orderSchema } from '../../utils/schema/create-order.schema';

export const CreateOrderValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = orderSchema.validate(req.body);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');
    res.status(422).json({ error: message });
  }
};
