import HttpException from '../../exceptions/HttpException';
import { IAddUser } from '../../interfaces/common.interface';
import { AddNewUser } from '../addUser.service';
import * as admin from 'firebase-admin';

class SuperAdminService {
  public async addNewRestaurantAdmin(user: IAddUser): Promise<boolean> {
    if (!user) throw new HttpException(400, 'Invalid Input');
    const userInformation = new AddNewUser(user);
    const addUserStatus = await userInformation.addNewUser();
    return addUserStatus;
  }

  public async addSuperAdminCustomAttributes(uid: string): Promise<boolean> {
    if (!uid) throw new HttpException(400, 'Invalid Input');
    try {
      admin
        .auth()
        .setCustomUserClaims(uid, { superAdmin: true })
        .then(() => {
          console.log('Updated to Super User');
        });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const superAdmin = new SuperAdminService();
