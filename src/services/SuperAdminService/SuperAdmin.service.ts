import HttpException from '../../exceptions/HttpException';
import { IAddUser } from '../../interfaces/common.interface';
import { AddNewUser } from '../addUser.service';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { config as conf } from '../../config/app.config';

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
        .setCustomUserClaims(uid, {
          superAdmin: true,
          role: {
            isRestaurantAdmin: false,
            restaurantID: null,
            isRestaurantStaff: false,
          },
        })
        .then(() => {
          console.log('Updated to Super User');
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async addRestaurantAdminUserAndCustomAttributes(
    restaurantID: string,
    userName: string,
    password: string,
  ): Promise<boolean> {
    const data = JSON.stringify({
      email: userName,
      password: password,
      returnSecureToken: true,
    });

    // console.log(data);

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${conf.AUTH.googleAuthAPIKey}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const result = await axios.post(url, data, config);
      await admin.auth().setCustomUserClaims(result.data.localId, {
        superAdmin: false,
        role: {
          isRestaurantAdmin: true,
          restaurantID: restaurantID,
          isRestaurantStaff: false,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const superAdmin = new SuperAdminService();
