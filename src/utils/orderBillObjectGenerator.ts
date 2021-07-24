import { ICategorwiseBill, IOrderBillDetails } from '../interfaces/orderBill.interface';

export const OrderBillObjectGenerator = (
  total: number,
  food: number,
  drinks: number,
  foodCategory: ICategorwiseBill,
  drinksCategory: ICategorwiseBill,
) => {
  const orderBill: IOrderBillDetails = {
    totalBill: total,
    foodOrderBill: food,
    drinksOrderBill: drinks,
    categoryWiseFoodBill: foodCategory,
    categoryWiseDrinksBill: drinksCategory,
  };

  return orderBill;
};
