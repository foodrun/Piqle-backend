import HttpException from '../../exceptions/HttpException';
import { IRestaurantAdminDetails } from '../../interfaces/restaurant-admin.interface';
import { superAdminAddRestaurantAdmin } from './AddNewRestaurantAdmin/addNewAdminUser.service';

class SuperAdminService {
  public async addNewRestaurantAdmin(user: IRestaurantAdminDetails): Promise<any> {
    if (!user) throw new HttpException(400, 'Invalid Input');
    const adminAddStatus = await superAdminAddRestaurantAdmin.addNewRestaurantAdmin(user);
    return adminAddStatus;
  }
}

export const superAdmin = new SuperAdminService();
