import Joi from 'joi';

export const UpdateOrderSchema = Joi.object().keys({
  orderID: Joi.string().alphanum().min(20).max(20).required(),
  restaurantID: Joi.string().alphanum().min(20).max(20).required(),
  status: Joi.string().valid('placed', 'accepted', 'delivered', 'cancelled', 'declined').required(),
});
