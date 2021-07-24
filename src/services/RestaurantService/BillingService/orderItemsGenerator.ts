// import * as _ from 'lodash';
import { CANCELLED, DECLINED, DELIVERED } from '../../../constants';
import HttpException from '../../../exceptions/HttpException';
import { INewOrder } from '../../../interfaces/order.interface';
import { IOrderBill } from '../../../interfaces/orderBill.interface';

export const OrderItemsGenerator = (orderDetails: INewOrder, orderID: string): Array<IOrderBill> => {
  if (orderDetails) {
    const { orderStatus } = orderDetails;
    const orderItemList: Array<IOrderBill> = [];
    orderDetails.order.forEach(item => {
      const acceptedStatus = [DELIVERED, CANCELLED, DECLINED];
      if (!acceptedStatus.includes(orderStatus)) throw new HttpException(400, 'All your items are not delivered');
      if (item.customizable.length < 1) {
        const itemGenerator = {} as IOrderBill;
        itemGenerator['item_name'] = item.title;
        itemGenerator['item_price'] = item.price;
        itemGenerator['item_quantity'] = item.quantity;
        itemGenerator['orderID'] = orderID;
        itemGenerator['orderStatus'] = orderStatus;
        itemGenerator['placed_by'] = orderDetails['memberID'];
        itemGenerator['item_total'] =
          orderStatus === CANCELLED || orderStatus === DECLINED ? 0 : item.quantity * item.price;
        orderItemList.push(itemGenerator);
      } else {
        item.customizable.forEach(itemCustomization => {
          if (itemCustomization.optionQuantity > 0) {
            const itemGenerator = {} as IOrderBill;
            itemGenerator['item_name'] = item.title + ' ' + itemCustomization.optionTitle;
            itemGenerator['item_price'] = itemCustomization.optionPrice;
            itemGenerator['item_quantity'] = itemCustomization.optionQuantity;
            itemGenerator['item_total'] =
              orderStatus === CANCELLED || orderStatus === DECLINED
                ? 0
                : itemCustomization.optionPrice * itemCustomization.optionQuantity;
            itemGenerator['orderID'] = orderID;
            itemGenerator['orderStatus'] = orderStatus;
            itemGenerator['placed_by'] = orderDetails.memberID;
            orderItemList.push(itemGenerator);
          }
        });
      }
    });
    return orderItemList;
  }
};
