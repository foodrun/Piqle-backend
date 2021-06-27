interface ICustomizations {
  optionTitle: string;
  optionPrice: number;
  optionQuantity: number;
  optionID: string;
}

interface IItems {
  indicator: string;
  title: string;
  price: number;
  img_url: string;
  food_id: string;
  quantity: string;
  customizations: Array<ICustomizations>;
}

interface IFood {
  consumable_type: string;
  details: Array<IItems>;
}

export interface IOrder {
  restaurantID: string;
  tableID: string;
  sessionID: string;
  order: Array<IFood>;
}
