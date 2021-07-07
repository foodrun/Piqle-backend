import { IMenu, IMenuUpdate } from '../../../interfaces/menu-items.interface';

export class ItemsService {
  constructor(private _menuItemToUpdate: IMenuUpdate) {}
  private _menuData: IMenu;
  private _updatedMenuData: IMenu;

  setMenuData(data: IMenu) {
    // Call when we fetch menu object from DB
    this._menuData = data;
  }

  async processNewItemIntoCurrentObject() {
    const newItem = this._menuItemToUpdate;
  }

  getUpdatedMenuData(): IMenu {
    return this._updatedMenuData;
  }
}
