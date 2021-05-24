import { IRestaurantAdminDetails } from '../../interfaces/restaurant-admin.interface';
import { superAdminAddRestaurantAdmin } from './AddNewRestaurantAdmin/addNewAdminUser.service';

class SuperAdminService {
  public async addNewRestaurantAdmin(user: IRestaurantAdminDetails): Promise<any> {
    const adminAddStatus = await superAdminAddRestaurantAdmin.addNewRestaurantAdmin(user);
    console.log(adminAddStatus);
    return adminAddStatus;
  }
}

export const superAdmin = new SuperAdminService();
