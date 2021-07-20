import Joi from 'joi';

export const orderSchema = Joi.object().keys({
  sessionID: Joi.string().alphanum().min(20).max(20).required(),
  restaurantID: Joi.string().alphanum().min(20).max(20).required(),
  tableID: Joi.string().alphanum().min(20).max(20).required(),
  order: Joi.array()
    .items(
      Joi.object().keys({
        category_name: Joi.string().required(),
        category_id: Joi.string().required(),
        description: Joi.string().allow('').required(),
        id: Joi.string().required(),
        img_url: Joi.string().required(),
        indicator: Joi.string().required(),
        price: Joi.number().required(),
        title: Joi.string().required(),
        quantity: Joi.number().required(),
        customizable: Joi.array().items(
          Joi.object().keys({
            optionId: Joi.string().required(),
            optionPrice: Joi.number().required(),
            optionTitle: Joi.string().required(),
            optionQuantity: Joi.number().required(),
          }),
        ),
      }),
    )
    .required(),
});
