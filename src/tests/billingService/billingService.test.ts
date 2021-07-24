import { OrderItemsGenerator } from '../../services/RestaurantService/BillingService/orderItemsGenerator';
import { deliveredOrderList } from './deliveredOrderOutput.constant';
import { order } from './deliveredOrder.constant';
import { undeliveredOrder } from './undeliveredOrder.constant';
import { unDeliveredOrderList } from './undeliveredOrderOutput.constant';

describe('Billing', () => {
  it('Generates Right order item array for a delivered order', () => {
    const itemList = OrderItemsGenerator(order, 'xyz');
    expect(itemList).toEqual(deliveredOrderList);
  });

  it('Generates Right order item array for a Undelivered order', () => {
    const itemList = OrderItemsGenerator(undeliveredOrder, 'xyz');
    expect(itemList).toEqual(unDeliveredOrderList);
  });
});
