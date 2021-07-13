import HttpException from '../../../exceptions/HttpException';
import { IUser } from '../../../interfaces/common.interface';
import { INewOrder, IOrder } from '../../../interfaces/order.interface';
import { ICategorwiseBill } from '../../../interfaces/orderBill.interface';
import { ITables } from '../../../interfaces/table.interface';
import { OrderBillObjectGenerator } from '../../../utils/orderBillObjectGenerator';
import { BillingService } from '../BillingService/billing';
import { SessionOperations } from '../SessionService/SessionOperations/session-ops.service';
import { tableOperations } from '../TableService/TableOperations/table-operations.service';
import { orderOperations } from './OrderOperations/order-ops.service';

interface IOrderService {
  placeOrder(userDetails: IUser): Promise<{ orderID: string }>;
  isTableOccupiedAndHasSession(restaurantID: string, tableID: string): Promise<boolean>;
}

enum Bill {
  TOTAL = 'total',
  FOOD = 'food',
  DRINKS = 'drinks',
  FOOD_CATEGORIES = 'foodCategories',
  DRINKS_CATEGORIES = 'drinksCategories',
}

export class OrderService implements IOrderService {
  constructor(private _orderDetails?: INewOrder) {}
  async placeOrder(userDetails: IUser): Promise<{ orderID: string }> {
    const sessionOperations = new SessionOperations(
      this._orderDetails.restaurantID,
      (this._orderDetails.tableID as unknown) as string,
    );
    if (!(await sessionOperations.getSession((this._orderDetails.sessionID as unknown) as string)))
      throw new HttpException(400, 'Invalid Session ID');
    if (await this.isTableOccupiedAndHasSession()) {
      // const billing = new BillingService(this._orderDetails);
      // billing.itemsSetter();
      // billing.calculateOrderTotal();
      const orderID = await orderOperations.createNewOrder(
        this._orderDetails,
        userDetails,
        // OrderBillObjectGenerator(
        //   billing.Getter(Bill.TOTAL) as number,
        //   billing.Getter(Bill.FOOD) as number,
        //   billing.Getter(Bill.DRINKS) as number,
        //   billing.Getter(Bill.FOOD_CATEGORIES) as ICategorwiseBill,
        //   billing.Getter(Bill.DRINKS_CATEGORIES) as ICategorwiseBill,
        // ),
      );
      if (orderID) {
        const updateSessionWithOrderID = await sessionOperations.updateSessionOrders(
          (this._orderDetails.sessionID as unknown) as string,
          orderID.id,
        );
        if (updateSessionWithOrderID) {
          //Add in logic for Billing
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
      await tableOperations.getTable(this._orderDetails.restaurantID, (this._orderDetails.tableID as unknown) as string)
    );

    const tableOccupiedStatus = tableInformation.table.tableOccupied;
    const tableSession = tableInformation.table.currentSession;

    if (tableOccupiedStatus && tableSession) return true;

    return false;
  }

  async updateOrderStatus(restaurantID: string, orderID: string, orderStatus: string): Promise<boolean> {
    if (await orderOperations.updateOrder(restaurantID, orderID, orderStatus)) return true;
    return false;
  }
}
