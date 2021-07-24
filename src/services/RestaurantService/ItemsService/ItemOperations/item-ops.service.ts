import { DRINKS_DATA, FOOD_DATA, RESTAURANTS } from '../../../../constants';
import { dbConfig } from '../../../../database';
import { IMenu } from '../../../../interfaces/menu-items.interface';

export class ItemOperations {
  constructor(private _restaurantID: string) {}
  async updateItem(menu: IMenu, type: string): Promise<boolean> {
    await dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(type)
      .doc(menu.category_id)
      .update(menu);
    return true;
  }

  async getMenuObject(item_type: string, categoryID: string): Promise<IMenu> {
    const validItemTypes = [FOOD_DATA, DRINKS_DATA];
    if (!validItemTypes.includes(item_type)) throw new Error('Item Type Does not Exist');
    const restaurantRef = await dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(item_type)
      .doc(categoryID)
      .get();

    return restaurantRef.data() as IMenu;
  }
}
