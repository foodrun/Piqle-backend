import { Request, Response, NextFunction } from 'express';
import { UpdateOrderSchema } from '../../utils/schema/update-order.schema';

export const UpdateOrderValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UpdateOrderSchema.validate(req.body);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');
    res.status(422).json({ error: message });
  }
};
