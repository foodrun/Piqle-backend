import * as _ from 'lodash';
import { INewOrder } from '../../../interfaces/order.interface';

interface IOrderBill {
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_total: number;
  placed_by: string;
  orderID: string;
  orderStatus: string;
}
export class BillingService {
  getItemsArrayFromOrder(order: INewOrder, orderID: string): Array<IOrderBill> {
    return [
      {
        item_name: 'chicken',
        item_quantity: 5,
        item_price: 50,
        item_total: 250,
        placed_by: 'abcdef',
        orderID: orderID,
        orderStatus: 'delivered',
      },
    ];
  }
}
