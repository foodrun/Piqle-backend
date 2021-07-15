import HttpException from '../../../exceptions/HttpException';
import { INewOrder } from '../../../interfaces/order.interface';
import { IFinalBill, IOrderBill } from '../../../interfaces/orderBill.interface';
import { SessionOperations } from '../SessionService/SessionOperations/session-ops.service';
import { OrderItemsGenerator } from './orderItemsGenerator';

export class BillingService {
  private _orderReferenceArray = [] as Array<FirebaseFirestore.DocumentReference>;
  private _adHocMasterArrayBeforeFlattning = [] as Array<Array<IOrderBill>>;
  private _adHocMasterArrayAfterFlattning = [] as Array<IOrderBill>;
  private _bill = {} as IFinalBill;
  private _sessionID: string;

  getOrderReferencesFromDB = async (restaurantID: string, sessionID: string) => {
    this._sessionID = sessionID;
    const sessionOperations = new SessionOperations(restaurantID);
    const userSessionArray = await sessionOperations.getSession(sessionID);
    this._orderReferenceArray = userSessionArray.orders;
  };

  getIndivisualOrderBill = async () => {
    for (const ref of this._orderReferenceArray) {
      const orderDetails = ((await ref.get()).data() as unknown) as INewOrder;
      if (!orderDetails) throw new HttpException(500, 'Orders for the sessions do not exist');
      const orderItemsArray = OrderItemsGenerator(orderDetails, ref.id);
      this._adHocMasterArrayBeforeFlattning.push(orderItemsArray);
    }

    this._adHocMasterArrayAfterFlattning = this._adHocMasterArrayBeforeFlattning.flat();
  };

  generateFinalBill = () => {
    let totalBill = 0;
    this._adHocMasterArrayAfterFlattning.forEach(item => {
      if (item.item_total && item.item_total !== null) {
        totalBill += item.item_total;
      }
    });

    this._bill['gross_total'] = totalBill;
    this._bill['items'] = this._adHocMasterArrayAfterFlattning;
    this._bill['sessionID'] = this._sessionID;
    this._bill['gst_1'] = 0;
    this._bill['gst_2'] = 0;
    this._bill['net_total'] = totalBill;
    this._bill['other_charges'] = 0;
  };

  getSessionTotalBill = (): IFinalBill => {
    return this._bill;
  };
}
