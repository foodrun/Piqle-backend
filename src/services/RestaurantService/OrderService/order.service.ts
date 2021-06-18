import HttpException from '../../../exceptions/HttpException';
import { GetTableDocument } from '../../../helper/OrderHelper/GetTableStatus';
import { IOrder } from '../../../interfaces/order.interface';

interface IOrderService {
  placeOrder(restaurantID: string, tableID: string): Promise<{ orderID: string }>;
  isTableActive(restaurantID: string, tableID: string): Promise<boolean>;
}

export class OrderService implements IOrderService {
  constructor(private _orderDetails: IOrder) {}
  async placeOrder(): Promise<{ orderID: string }> {
    const isTableActive = await this.isTableActive();
    if (isTableActive) {
      console.log(isTableActive);
      return { orderID: '1234' };
      // Update current session with the new order
    } else {
      // Create New User Session
      return { orderID: '1234' };
    }
  }

  async isTableActive(): Promise<boolean> {
    const tableStatus = await GetTableDocument(this._orderDetails.restaurantID, this._orderDetails.tableID);
    return tableStatus;
  }
}
