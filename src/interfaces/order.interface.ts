export interface ICustomizations {
  optionTitle: string;
  optionPrice: number;
  optionQuantity: number;
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
