//Create Order
//Modify Order
//Delete Order
//Update Order

import { IOrder } from '../../../../interfaces/order.interface';

interface IOrderClass {
  createNewOrder(orderDetails: IOrder, userSession: string): Promise<{ orderID: string }>;
}

export class OrderOperations implements IOrderClass {
  async createNewOrder(orderDetails: IOrder, customerDetails: string) {
    console.log(orderDetails, customerDetails);
    return { orderID: '1234' };
  }
}
