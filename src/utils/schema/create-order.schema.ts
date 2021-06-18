import Joi from 'joi';

export const orderSchema = Joi.object().keys({
  restaurantID: Joi.string().alphanum().min(20).max(20).required(),
  tableID: Joi.string().alphanum().min(20).max(20).required(),
  order: Joi.array()
    .items(
      Joi.object().keys({
        consumable_type: Joi.string().valid('food', 'drinks').required(),
        details: Joi.array().items(
          Joi.object().keys({
            category_name: Joi.string().required(),
            category_id: Joi.string().alphanum().min(20).max(20).required(),
            items: Joi.array().items(
              Joi.object().keys({
                indicator: Joi.string().required(),
                title: Joi.string().required(),
                price: Joi.number().required(),
                img_url: Joi.string().required(),
                food_id: Joi.string().required(),
                quantity: Joi.number().required(),
                customizations: Joi.array().items(
                  Joi.object().keys({
                    optionTitle: Joi.string().required(),
                    optionPrice: Joi.number().required(),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    )
    .required(),
});
