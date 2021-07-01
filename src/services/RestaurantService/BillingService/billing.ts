import * as _ from 'lodash';
import { IFood, IOrder } from '../../../interfaces/order.interface';

interface ICategorwiseBill {
  [category: string]: number;
}

enum ConsumableType {
  FOOD = 'food',
  DRINKS = 'drinks',
}

enum Bill {
  TOTAL = 'total',
  FOOD = 'food',
  DRINKS = 'drinks',
  FOOD_CATEGORIES = 'foodCategories',
  DRINKS_CATEGORIES = 'drinksCategories',
}

export class BillingService {
  constructor(private _orders: IOrder) {}
  private _foodOrderBill = 0;
  private _drinksOrderBill = 0;
  private _totalOrderBill: number;
  private _foodOrder: IFood[];
  private _drinksOrder: IFood[];
  private _categoryWiseFoodBill: ICategorwiseBill;
  private _categoryWiseDrinksBill: ICategorwiseBill;

  itemsSetter(): void {
    this._foodOrder = this._orders.order.filter(food => Boolean(food.consumable_type === ConsumableType.FOOD));
    this._drinksOrder = this._orders.order.filter(drinks => Boolean(drinks.consumable_type === ConsumableType.DRINKS));
  }

  calculateOrderTotal(): void {
    this.calculateCategoryWiseBill(ConsumableType.FOOD);
    this.calculateCategoryWiseBill(ConsumableType.DRINKS);
  }

  calculateCategoryWiseBill(consumable_type: string): void {
    let orderDetails: IFood;
    const OrderCategoryWiseBill: ICategorwiseBill = {};
    const isConsumableTypeFood = consumable_type === ConsumableType.FOOD;
    if (isConsumableTypeFood) {
      orderDetails = this._foodOrder[0];
    } else {
      orderDetails = this._drinksOrder[0];
    }
    if (orderDetails && orderDetails) {
      orderDetails.details.forEach(category => {
        const categoryName = category.category_name;
        if (!(categoryName in OrderCategoryWiseBill)) {
          OrderCategoryWiseBill[categoryName] = 0;
          category.items.forEach(item => {
            if (item.customizable.length > 0) {
              const customizationsWithQuantityGreaterThanZero = item.customizable.filter(
                cusItems => cusItems.optionQuantity > 0 && cusItems.optionQuantity !== null,
              );
              customizationsWithQuantityGreaterThanZero.forEach(customization => {
                if (customization.optionQuantity > 0) {
                  const totalItemCost = customization.optionPrice * customization.optionQuantity;
                  OrderCategoryWiseBill[categoryName] += totalItemCost;
                }
              });
            } else {
              if (item.quantity > 0) {
                const totalItemCost = item.price * item.quantity;
                OrderCategoryWiseBill[categoryName] += totalItemCost;
              }
            }
          });
        }
      });
    }
    if (isConsumableTypeFood) {
      let foodBill = 0;
      this._categoryWiseFoodBill = OrderCategoryWiseBill;
      _.map(this._categoryWiseFoodBill, v => {
        foodBill += v;
        this._foodOrderBill = foodBill;
      });
    } else {
      let drinksBill = 0;
      this._categoryWiseDrinksBill = OrderCategoryWiseBill;
      _.map(this._categoryWiseDrinksBill, v => {
        drinksBill += v;
        this._drinksOrderBill = drinksBill;
      });
    }
  }

  Getter(bill: string): number | ICategorwiseBill {
    if (bill === Bill.TOTAL) return (this._totalOrderBill = this._foodOrderBill + this._drinksOrderBill);
    if (bill === Bill.FOOD) return this._foodOrderBill;
    if (bill === Bill.DRINKS) return this._drinksOrderBill;
    if (bill === Bill.FOOD_CATEGORIES) return this._categoryWiseFoodBill ? this._categoryWiseFoodBill : {};
    if (bill === Bill.DRINKS_CATEGORIES) return this._categoryWiseDrinksBill ? this._categoryWiseDrinksBill : {};
    throw new Error('Bill Does not Exist');
  }
}
