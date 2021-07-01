export interface ICategorwiseBill {
  [category: string]: number;
}

export interface IOrderBillDetails {
  foodOrderBill: number;
  drinksOrderBill: number;
  totalBill: number;
  categoryWiseFoodBill: ICategorwiseBill;
  categoryWiseDrinksBill: ICategorwiseBill;
}
