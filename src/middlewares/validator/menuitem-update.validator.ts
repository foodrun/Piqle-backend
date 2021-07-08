import { Request, Response, NextFunction } from 'express';
import { UpdateMenuItemSchema } from '../../utils/schema/update-menuitem.schema';

export const UpdateMenuItemValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UpdateMenuItemSchema.validate(req.body);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');
    res.status(422).json({ error: message });
  }
};
