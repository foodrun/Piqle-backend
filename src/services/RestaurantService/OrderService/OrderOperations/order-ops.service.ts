//Create Order
//Modify Order
//Delete Order
//Update Order

import { ORDERS, RESTAURANTS, TABLES } from '../../../../constants';
import { dbConfig } from '../../../../database';
import { OrderStatus } from '../../../../enums/orderStatus.enum';
import { IUser } from '../../../../interfaces/common.interface';
import { IOrder } from '../../../../interfaces/order.interface';

interface IOrderClass {
  createNewOrder(
    orderDetails: IOrder,
    userDetails: IUser,
  ): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>;
}

class OrderOperations implements IOrderClass {
  async createNewOrder(
    orderDetails: IOrder,
    userDetails: IUser,
  ): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    const { tableID, ...order } = orderDetails;
    const orderID = await dbConfig()
      .collection(RESTAURANTS)
      .doc(orderDetails.restaurantID)
      .collection(ORDERS)
      .add({
        orderStatus: OrderStatus.PLACED,
        ...order,
        ...userDetails,
        tableID: dbConfig().doc(`/${RESTAURANTS}/${orderDetails.restaurantID}/${TABLES}/${tableID}`),
      });
    return orderID;
  }
}

export const orderOperations = new OrderOperations();
