import { BillingService } from '../../services/RestaurantService/BillingService/billing';
import { deliveredOrderList } from './deliveredOrder.constant';
import { order } from './order.constant';

describe('Billing', () => {
  it('Generates Right order item array for a delivered order', () => {
    const billingService = new BillingService();
    const itemList = billingService.getItemsArrayFromOrder(order, 'xyz');
    expect(itemList).toEqual(deliveredOrderList);
  });
});
