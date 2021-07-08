import HttpException from '../../../exceptions/HttpException';
import { IMenu, IMenuUpdate } from '../../../interfaces/menu-items.interface';
import lodash from 'lodash';
export class ItemsUpdateService {
  constructor(private _menuItemToUpdate: IMenuUpdate) {}
  private _menuData: IMenu;
  private _updatedMenuData: IMenu;

  setMenuData(data: IMenu): void {
    this._menuData = data;
  }

  async processNewItemIntoCurrentObject() {
    const newItem = this._menuItemToUpdate;
    delete newItem.type;
    const currentMenu = this._menuData;
    const doesItemToUpdateExistInCurrentMenu = this.checkIfItemExistsInCurrentMenu();
    if (!doesItemToUpdateExistInCurrentMenu)
      throw new HttpException(400, 'Item to update does not exist in current menu');
    const items = currentMenu.items;
    const index = items.findIndex(item => item.id === newItem.id);
    this._updatedMenuData = lodash.cloneDeep(currentMenu);
    this._updatedMenuData.items[index] = newItem;
  }

  getUpdatedMenuData(): IMenu {
    return this._updatedMenuData;
  }

  private checkIfItemExistsInCurrentMenu(): boolean {
    return !!this._menuData.items.find(item => item.id === this._menuItemToUpdate.id);
  }
}
