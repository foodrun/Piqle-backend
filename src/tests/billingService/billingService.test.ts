import { BillingService } from '../../services/RestaurantService/BillingService/billing';
import { order } from './order.constant';

enum Bill {
  TOTAL = 'total',
  FOOD = 'food',
  DRINKS = 'drinks',
  FOOD_CATEGORIES = 'foodCategories',
  DRINKS_CATEGORIES = 'drinksCategories',
}

describe('Billing', () => {
  const billingService = new BillingService(order);
  billingService.itemsSetter();
  billingService.calculateOrderTotal();
  it('Correctly forms food items categories costs', () => {
    expect(billingService.Getter(Bill.FOOD_CATEGORIES)).toEqual({ starter: 2900 });
  });
  it('Correctly adds food items costs', () => {
    expect(billingService.Getter(Bill.FOOD)).toBe(2900);
  });
  it('Correctly forms drink items categories costs', () => {
    expect(billingService.Getter(Bill.DRINKS_CATEGORIES)).toEqual({
      'Bottled Beer': 4170,
      Cocktail: 15840,
      'Whisky/Whiskey': 3033,
    });
  });
  it('Correctly adds drink items costs', () => {
    expect(billingService.Getter(Bill.DRINKS)).toBe(23043);
  });
  it('Correctly adds an orders items costs - with and without customizations', () => {
    expect(billingService.Getter('total')).toBe(25943);
  });
});
