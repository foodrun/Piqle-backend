export interface ICustomizations {
  optionTitle: string;
  optionPrice: number;
  optionQuantity?: number;
  optionId: string;
}

export interface IItem {
  indicator: string;
  title: string;
  price: number;
  img_url: string;
  food_id?: string;
  id?: string;
  quantity: number;
  customizable?: Array<ICustomizations>;
}

export interface IItems {
  category_name: string;
  category_id: string;
  items: Array<IItem>;
}

export interface IFood {
  consumable_type: string;
  details: Array<IItems>;
}

export interface IOrder {
  restaurantID: string;
  tableID: string;
  sessionID: string;
  order: Array<IFood>;
}

export interface INewOrder {
  restaurantID: string;
  tableID: string;
  sessionID: string;
  order: Array<IOrderItem>;
}

export interface IOrderItem {
  category_id: string;
  category_name: string;
  description: string;
  id: string;
  img_url: string;
  indicator: string;
  price: number;
  title: string;
  customizable: Array<ICustomizations>;
}
