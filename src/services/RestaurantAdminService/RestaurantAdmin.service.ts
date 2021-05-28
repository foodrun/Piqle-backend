import HttpException from '../../exceptions/HttpException';
import { IAddUser } from '../../interfaces/common.interface';
import { AddNewUser } from '../addUser.service';

class RestaurantAdminService {
  public async addNewRestaurantAdmin(user: IAddUser): Promise<boolean> {
    if (!user) throw new HttpException(400, 'Invalid Input');
    const userInformation = new AddNewUser(user);
    const addUserStatus = await userInformation.addNewUser();
    return addUserStatus;
  }
}

export const restaurantAdminService = new RestaurantAdminService();
