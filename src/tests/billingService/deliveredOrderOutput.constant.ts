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
    item_name: 'Medium (Serves 2-4))',
    item_quantity: 5,
    item_price: 240,
    item_total: 1200,
    placed_by: '99kLqf4xEKM7PD4wpzsSf7M0qZc2',
    orderID: 'xyz',
    orderStatus: 'delivered',
  },
  {
    item_name: 'Large (Serves 6-9)',
    item_quantity: 5,
    item_price: 650,
    item_total: 3250,
    placed_by: '99kLqf4xEKM7PD4wpzsSf7M0qZc2',
    orderID: 'xyz',
    orderStatus: 'delivered',
  },
  {
    item_name: 'Paneer Manchurian',
    item_quantity: 3,
    item_price: 575,
    item_total: 1725,
    placed_by: '99kLqf4xEKM7PD4wpzsSf7M0qZc2',
    orderID: 'xyz',
    orderStatus: 'delivered',
  },
];
