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

export interface IFinalBill {
  sessionID: string;
  gross_total: number;
  gst_1: number;
  gst_2: number;
  other_charges: string | unknown | null;
  net_total: number;
  items: Array<IOrderBill>;
}

export interface IBillRequest {
  restaurantID: string;
  sessionID: string;
}
