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

export interface IOrderBill {
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_total: number | null;
  placed_by: string;
  orderID: string;
  orderStatus: string;
}
