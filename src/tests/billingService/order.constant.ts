import { IOrder } from '../../interfaces/order.interface';

export const order: IOrder = {
  sessionID: 'FFpDcKmegOE2uSmE96Zz',
  restaurantID: 'naifqEdhimmq9PX9Rqko',
  tableID: 'RaBXx4Wd1I7Lw3GIYWe7',
  order: [
    {
      consumable_type: 'food',
      details: [
        {
          category_name: 'starter',
          category_id: 'AF2Vrtz7bZBYrqVoEtuA',
          items: [
            {
              indicator: 'veg',
              title: 'Chilli BabyCorn',
              price: 700,
              img_url: 'https://5.imimg.com/data5/BR/JP/GLAD-28464664/paneer-manchurian-500x500.png',
              food_id: 'fdc515448a014b1258e3dbdc2a487e87',
              quantity: 3,
              customizable: [],
            },
            {
              indicator: 'veg',
              title: 'Paneer Manchurian',
              price: 500,
              img_url: 'https://5.imimg.com/data5/BR/JP/GLAD-28464664/paneer-manchurian-500x500.png',
              food_id: 'fdc515448a014b1258e3dbdc2a487e87',
              quantity: 2,
              customizable: [
                {
                  optionTitle: 'Medium (Serves 5-7)',
                  optionPrice: 400,
                  optionQuantity: 1,
                  optionId: '1234',
                },
              ],
            },
            {
              indicator: 'veg',
              title: 'Gobi Manchurian',
              price: 500,
              img_url: 'https://5.imimg.com/data5/BR/JP/GLAD-28464664/paneer-manchurian-500x500.png',
              food_id: 'fdc515448a014b1258e3dbdc2a487e89',
              quantity: 2,
              customizable: [
                {
                  optionTitle: 'Medium (Serves 5-7)',
                  optionPrice: 400,
                  optionQuantity: 1,
                  optionId: '1234',
                },
                {
                  optionTitle: 'Large (Serves 6-8)',
                  optionPrice: 600,
                  optionQuantity: 0,
                  optionId: '1234',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      consumable_type: 'drinks',
      details: [
        {
          category_name: 'Bottled Beer',
          category_id: 'skAU54pDAvEbjQIbCKmM',
          items: [
            {
              id: '8d760f99ca0a46438d061e7b4203df87',
              title: 'Corona',
              indicator: 'Alcoholic',
              price: 175,
              img_url:
                'https://www.corona.com/content/corona-global/en/home/_jcr_content/contentPar/section/full-section-content/section_1/full-section-content/section/normal-section-content/grid/g31/image.img.png/prd-corona.png',
              customizable: [
                {
                  optionId: 'skAU54pDAvEbjQIbCKmMOP1',
                  optionTitle: '330ml',
                  optionPrice: 175,
                  optionQuantity: 5,
                },
                {
                  optionId: 'skAU54pDAvEbjQIbCKmMOP2',
                  optionTitle: '550ml',
                  optionPrice: 325,
                  optionQuantity: 1,
                },
              ],
              quantity: 0,
            },
            {
              id: '80c5f06f636d2a1b0df2f7d9af557f58',
              title: 'Kingfisher Ultra',
              indicator: 'Alcoholic',
              price: 270,
              img_url:
                'https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Fultramax.jpg&h=570&w=855&q=100&v=20170226&c=1',
              customizable: [],
              quantity: 11,
            },
          ],
        },
        {
          category_name: 'Whisky/Whiskey',
          category_id: 'wzGG6N3bPbQm3vL4aBld',
          items: [
            {
              id: '04f33bb5725d1015b9a521b71af927eb',
              title: 'Jim Beam',
              indicator: 'Alcoholic',
              price: 789,
              img_url: '',
              customizable: [],
              quantity: 1,
            },
            {
              id: 'efcad93d8081293be94c9055561f2ca2',
              title: 'Black Dog',
              indicator: 'Alcoholic',
              price: 344,
              img_url:
                'http://barzy.in/wp-content/uploads/2020/05/BLACK-DOG-CENTENARY-AGED-AND-RARE-BLACK-RESERVESCOTCH-WHISKY.jpeg',
              customizable: [],
              quantity: 1,
            },
            {
              id: '51ac81a22536c40387c2de0e04dc84d7',
              title: 'Black and white',
              indicator: 'Alcoholic',
              price: 475,
              img_url: 'https://i0.wp.com/kinywaji.com/wp-content/uploads/2019/05/Black-and_White_whisky.jpg?ssl=1',
              customizable: [],
              quantity: 4,
            },
          ],
        },
        {
          category_name: 'Cocktail',
          category_id: 'Pykfdd93R7baX6mZ5HMk',
          items: [
            {
              id: 'e7524ba089fb5ea609c986482d982211',
              title: 'Liit',
              indicator: 'Alcoholic',
              price: 495,
              img_url: '"https://www.mumbailive.com/images/news/cropped_151134822182.jpg?w=1368',
              customizable: [],
              quantity: 32,
            },
          ],
        },
      ],
    },
  ],
};
