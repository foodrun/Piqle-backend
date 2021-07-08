import { ICustomizations } from './order.interface';

export interface IMenuItem {
  category_id: string;
  category_name: string;
  description: string;
  id: string;
  img_url: string;
  indicator: string;
  price: number;
  title: string;
  availibility: boolean;
  customizable: ICustomizations[];
}

export interface IMenu {
  category_id: string;
  category_name: string;
  items: IMenuItem[];
}

export interface IMenuUpdate extends IMenuItem {
  type: string;
  restaurantID: string;
}
