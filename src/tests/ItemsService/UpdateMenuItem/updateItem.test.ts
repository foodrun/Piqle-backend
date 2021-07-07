import { ItemsService } from '../../../services/RestaurantService/ItemsService/items.service';
import { menuItem } from './menuItem.constant';
import { UpdateItem } from './updateItem.constant';
import { updatedItemInMenu } from './updatedItem.constant';

describe('If the object in the array is updating rightly', () => {
  it('Updates the item with customizations rightly', () => {
    const itemService = new ItemsService(UpdateItem);
    itemService.setMenuData(menuItem);
    itemService.processNewItemIntoCurrentObject();
    expect(itemService.getUpdatedMenuData()).toEqual(updatedItemInMenu);
  });
});
