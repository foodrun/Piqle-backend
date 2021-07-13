import { INewOrder } from '../../interfaces/order.interface';

export const order: INewOrder = {
  sessionID: ('Rv0ye3q935oQgFeGiFJH' as unknown) as FirebaseFirestore.DocumentReference,
  restaurantID: 'naifqEdhimmq9PX9Rqko',
  tableID: ('SkN64WZEZnQktfcQLDbZ' as unknown) as FirebaseFirestore.DocumentReference,
  end_timestamp: ('13 July 2021 at 17:55:30 UTC+5:30' as unknown) as FirebaseFirestore.Timestamp,
  start_timestamp: ('13 July 2021 at 17:55:30 UTC+5:30' as unknown) as FirebaseFirestore.Timestamp,
  memberID: '99kLqf4xEKM7PD4wpzsSf7M0qZc2',
  memberName: 'Vladimir',
  orderStatus: 'delivered',
  order: [
    {
      price: 475,
      category_name: 'Main Course',
      img_url:
        'https://www.simplyrecipes.com/thmb/ZO7EpqTvX4-3oWZJ_bEoyPgcaQ4=/1600x1600/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__02__2017-02-27-ChickenTikkaMasala-16-d8f19c6207b849be8a63695c04a88ec2.jpg',
      description: '',
      title: 'Chicken Tikka masala',
      category_id: 'clYxQf15MIATJ1Jv78Zk',
      id: '3127140075ac024329489f2197e4ac0a',
      indicator: 'Non-Veg',
      quantity: 4,
      customizable: [
        {
          optionId: 'clYxQf15MIATJ1Jv78ZkOP1',
          optionTitle: 'Small (Serves 1-2)',
          optionPrice: 230,
          optionQuantity: 0,
        },
        {
          optionTitle: 'Medium (Serves 2-4))',
          optionPrice: 240,
          optionId: 'clYxQf15MIATJ1Jv78ZkOP2',
          optionQuantity: 5,
        },
        {
          optionId: 'clYxQf15MIATJ1Jv78ZkOP3',
          optionPrice: 650,
          optionTitle: 'Large (Serves 6-9)',
          optionQuantity: 5,
        },
      ],
    },
    {
      price: 575,
      category_name: 'Starter',
      img_url:
        'https://www.simplyrecipes.com/thmb/ZO7EpqTvX4-3oWZJ_bEoyPgcaQ4=/1600x1600/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__02__2017-02-27-ChickenTikkaMasala-16-d8f19c6207b849be8a63695c04a88ec2.jpg',
      description: '',
      title: 'Paneer Manchurian',
      category_id: 'clYxQf15MIATJ1Jv78Zk',
      id: 'fdc515448a014b1258e3dbdc2a487e87',
      indicator: 'Veg',
      quantity: 3,
      customizable: [],
    },
  ],
};
