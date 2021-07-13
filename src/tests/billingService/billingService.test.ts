import { BillingService } from '../../services/RestaurantService/BillingService/billing';
import { deliveredOrderList } from './deliveredOrderOutput.constant';
import { order } from './deliveredOrder.constant';
import { undeliveredOrder } from './undeliveredOrder.constant';
import { unDeliveredOrderList } from './undeliveredOrderOutput.constant';

describe('Billing', () => {
  it('Generates Right order item array for a delivered order', () => {
    const billingService = new BillingService();
    const itemList = billingService.getItemsArrayFromOrder(order, 'xyz');
    expect(itemList).toEqual(deliveredOrderList);
  });

  it('Generates Right order item array for a Undelivered order', () => {
    const billingService = new BillingService();
    const itemList = billingService.getItemsArrayFromOrder(undeliveredOrder, 'xyz');
    expect(itemList).toEqual(unDeliveredOrderList);
  });
});
