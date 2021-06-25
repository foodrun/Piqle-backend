import HttpException from '../../../exceptions/HttpException';
import { IUser } from '../../../interfaces/common.interface';
import { IOrder } from '../../../interfaces/order.interface';
import { ITables } from '../../../interfaces/table.interface';
import { SessionOperations } from '../SessionService/SessionOperations/session-ops.service';
import { tableOperations } from '../TableService/TableOperations/table-operations.service';
import { orderOperations } from './OrderOperations/order-ops.service';

interface IOrderService {
  placeOrder(userDetails: IUser): Promise<{ orderID: string }>;
  isTableOccupiedAndHasSession(restaurantID: string, tableID: string): Promise<boolean>;
}

export class OrderService implements IOrderService {
  constructor(private _orderDetails: IOrder) {}
  async placeOrder(userDetails: IUser): Promise<{ orderID: string }> {
    //Check if such a session exists
    if (await this.isTableOccupiedAndHasSession()) {
      const orderID = await orderOperations.createNewOrder(this._orderDetails, userDetails);
      if (orderID) {
        const sessionOperations = new SessionOperations(this._orderDetails.restaurantID, this._orderDetails.tableID);
        const updateSessionWithOrderID = await sessionOperations.updateSessionOrders(
          this._orderDetails.sessionID,
          orderID.id,
        );
        if (updateSessionWithOrderID) {
          return { orderID: orderID.id };
        } else {
          throw new HttpException(500, 'Something went wrong');
        }
      }
    } else {
      throw new HttpException(400, 'Table Inactive. Request new OTP from Restaurant');
    }
  }

  async isTableOccupiedAndHasSession(): Promise<boolean> {
    const tableInformation = <ITables>(
      await tableOperations.getTable(this._orderDetails.restaurantID, this._orderDetails.tableID)
    );

    const tableOccupiedStatus = tableInformation.table.tableOccupied;
    const tableSession = tableInformation.table.currentSession;

    if (tableOccupiedStatus && tableSession) return true;

    return false;
  }
}
