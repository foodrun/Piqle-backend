interface IOrderBill {
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_total: number;
  placed_by: string;
  orderID: string;
  orderStatus: string;
}

export const deliveredOrderList: Array<IOrderBill> = [
  {
    item_name: 'chicken',
    item_quantity: 5,
    item_price: 50,
    item_total: 250,
    placed_by: 'abcdef',
    orderID: '23m1nj1n1jn31kn1',
    orderStatus: 'delivered',
  },
  {
    item_name: 'chicken',
    item_quantity: 5,
    item_price: 50,
    item_total: 250,
    placed_by: 'abcdef',
    orderID: '23m1nj1n1jn31kn1',
    orderStatus: 'delivered',
  },
  {
    item_name: 'chicken',
    item_quantity: 5,
    item_price: 50,
    item_total: 250,
    placed_by: 'abcdef',
    orderID: '23m1nj1n1jn31kn1',
    orderStatus: 'delivered',
  },
];
