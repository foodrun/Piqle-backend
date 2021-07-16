//Create Order
//Modify Order
//Delete Order
//Update Order

import * as admin from 'firebase-admin';
import { ORDERS, PLACED, RESTAURANTS, SESSIONS, TABLES } from '../../../../constants';
import { dbConfig } from '../../../../database';
import { IUser } from '../../../../interfaces/common.interface';
import { INewOrder } from '../../../../interfaces/order.interface';
import { IOrderBillDetails } from '../../../../interfaces/orderBill.interface';

interface IOrderClass {
  createNewOrder(
    orderDetails: INewOrder,
    userDetails: IUser,
    orderBillDetails: IOrderBillDetails,
  ): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>;
}

class OrderOperations implements IOrderClass {
  async createNewOrder(
    orderDetails: INewOrder,
    userDetails: IUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    orderBillDetails?: IOrderBillDetails,
  ): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tableID, sessionID, restaurantID, ...order } = orderDetails;
    const orderID = await dbConfig()
      .collection(RESTAURANTS)
      .doc(orderDetails.restaurantID)
      .collection(ORDERS)
      .add({
        orderStatus: PLACED,
        ...order,
        ...userDetails,
        // orderBillDetails,
        sessionID: dbConfig().doc(`/${RESTAURANTS}/${orderDetails.restaurantID}/${SESSIONS}/${sessionID}`),
        tableID: dbConfig().doc(`/${RESTAURANTS}/${orderDetails.restaurantID}/${TABLES}/${tableID}`),
        start_timestamp: admin.firestore.Timestamp.fromDate(new Date()),
        end_timestamp: null,
      });
    return orderID;
  }

  async updateOrder(restaurantID: string, orderID: string, orderStatus: string): Promise<boolean> {
    try {
      await dbConfig()
        .collection(RESTAURANTS)
        .doc(restaurantID)
        .collection(ORDERS)
        .doc(orderID)
        .update({ orderStatus: orderStatus });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const orderOperations = new OrderOperations();
