import * as _ from 'lodash';
import { INewOrder } from '../../../interfaces/order.interface';

interface IOrderBill {
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_total: number | null;
  placed_by: string;
  orderID: string;
  orderStatus: string;
}
export class BillingService {
  getItemsArrayFromOrder(orderDetails: INewOrder, orderID: string): Array<IOrderBill> {
    const orderItemList: Array<IOrderBill> = [];
    orderDetails.order.forEach(item => {
      if (item.customizable.length < 1) {
        const itemGenerator = {} as IOrderBill;
        itemGenerator['item_name'] = item.title;
        itemGenerator['item_price'] = item.price;
        itemGenerator['item_quantity'] = item.quantity;
        itemGenerator['orderID'] = orderID;
        itemGenerator['orderStatus'] = orderDetails.orderStatus;
        itemGenerator['placed_by'] = orderDetails['memberID'];
        itemGenerator['item_total'] = orderDetails.orderStatus === 'delivered' ? item.quantity * item.price : null;
        orderItemList.push(itemGenerator);
      } else {
        item.customizable.forEach(itemCustomization => {
          if (itemCustomization.optionQuantity > 0) {
            const itemGenerator = {} as IOrderBill;
            itemGenerator['item_name'] = itemCustomization.optionTitle;
            itemGenerator['item_price'] = itemCustomization.optionPrice;
            itemGenerator['item_quantity'] = itemCustomization.optionQuantity;
            itemGenerator['item_total'] =
              orderDetails.orderStatus === 'delivered'
                ? itemCustomization.optionPrice * itemCustomization.optionQuantity
                : null;
            itemGenerator['orderID'] = orderID;
            itemGenerator['orderStatus'] = orderDetails.orderStatus;
            itemGenerator['placed_by'] = orderDetails.memberID;
            orderItemList.push(itemGenerator);
          }
        });
      }
    });
    console.log(orderItemList, 'orderItemList');
    return orderItemList;
  }
}
