import { IMenuUpdate } from '../../../interfaces/menu-items.interface';
import { ItemOperations } from './ItemOperations/item-ops.service';
import { ItemsUpdateService } from './menu-items-update.service';

class ItemsService {
  async updateMenuItem(detailsOfItemToUpdate: IMenuUpdate) {
    const { type, category_id, restaurantID } = detailsOfItemToUpdate;
    const itemOperations = new ItemOperations(restaurantID);
    const ItemUpdateService = new ItemsUpdateService(detailsOfItemToUpdate);
    const currentMenuItemObjectInDB = await itemOperations.getMenuObject(type, category_id);
    ItemUpdateService.setMenuData(currentMenuItemObjectInDB);
    await ItemUpdateService.processNewItemIntoCurrentObject();
    const updatedMenuItemObject = ItemUpdateService.getUpdatedMenuData();
    if (await itemOperations.updateItem(updatedMenuItemObject, type)) return true;
    return false;
  }
}

export const itemsService = new ItemsService();
