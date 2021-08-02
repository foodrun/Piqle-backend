import Joi from 'joi';

export const UpdateMenuItemSchema = Joi.object().keys({
  price: Joi.number().required(),
  type: Joi.string().valid('food_data', 'drinks_data').required(),
  availibility: Joi.boolean().required(),
  indicator: Joi.string().required(),
  category_name: Joi.string().required(),
  img_url: Joi.string().allow('').required(),
  description: Joi.string().allow('').required(),
  title: Joi.string().required(),
  category_id: Joi.string().alphanum().min(20).max(20).required(),
  id: Joi.string().required(),
  restaurantID: Joi.string().alphanum().min(20).max(20).required(),
  customizable: Joi.array()
    .items(
      Joi.object().keys({
        optionTitle: Joi.string().required(),
        optionPrice: Joi.number().required(),
        optionId: Joi.string().required(),
      }),
    )
    .required(),
});
