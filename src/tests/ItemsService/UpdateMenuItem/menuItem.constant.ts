import { IMenu } from '../../../interfaces/menu-items.interface';

export const menuItem: IMenu = {
  items: [
    {
      price: 175,
      category_name: 'Main Course',
      category_id: 'clYxQf15MIATJ1Jv78Zk',
      img_url: 'https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken-.jpg',
      title: 'Chicken Butter masala',
      id: '33fe54dcecba655bbbe291619094aeac',
      indicator: 'Non-Veg',
      description: '',
      availibility: true,
      customizable: [],
    },
    {
      price: 275,
      category_name: 'Main Course',
      img_url:
        'https://www.simplyrecipes.com/thmb/ZO7EpqTvX4-3oWZJ_bEoyPgcaQ4=/1600x1600/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__02__2017-02-27-ChickenTikkaMasala-16-d8f19c6207b849be8a63695c04a88ec2.jpg',
      description: '',
      title: 'Chicken Tikka masala',
      category_id: 'clYxQf15MIATJ1Jv78Zk',
      id: '3127140075ac024329489f2197e4ac0a',
      customizable: [
        {
          optionId: 'clYxQf15MIATJ1Jv78ZkOP1',
          optionTitle: 'Small (Serves 1-2)',
          optionPrice: 120,
        },
        {
          optionTitle: 'Medium (Serves 2-4))',
          optionPrice: 220,
          optionId: 'clYxQf15MIATJ1Jv78ZkOP2',
        },
        {
          optionId: 'clYxQf15MIATJ1Jv78ZkOP3',
          optionPrice: 360,
          optionTitle: 'Large (Serves 6-8)',
        },
      ],
      indicator: 'Non-Veg',
      availibility: true,
    },
    {
      id: '24c4f0893832e9be310f1bdaf3c28140',
      category_id: 'clYxQf15MIATJ1Jv78Zk',
      indicator: 'Non-Veg',
      img_url: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Best-Mutton-Biryani-Recipe.jpg',
      category_name: 'Main Course',
      price: 475,
      title: 'Mutton biryani',
      description: 'Aromatic rice with spicy mutton pieces',
      availibility: true,
      customizable: [],
    },
  ],
  category_id: 'clYxQf15MIATJ1Jv78Zk',
  category_name: 'Main Course',
};
