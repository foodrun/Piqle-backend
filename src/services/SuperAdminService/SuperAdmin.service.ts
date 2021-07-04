import HttpException from '../../exceptions/HttpException';
import { IAddUser } from '../../interfaces/common.interface';
import { AddNewUser } from '../addUser.service';
import * as admin from 'firebase-admin';
import axios, { AxiosRequestConfig } from 'axios';
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
            isRestaurantWaiter: false,
            isRestaurantChef: false,
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
    let status: boolean;
    try {
      const data = JSON.stringify({
        email: userName,
        password: password,
        returnSecureToken: true,
      });

      const config = {
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${conf.AUTH.googleAuthAPIKey}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config as AxiosRequestConfig).then(function (response) {
        admin
          .auth()
          .setCustomUserClaims(response.data.localId, {
            superAdmin: false,
            role: {
              isRestaurantAdmin: true,
              restaurantID: restaurantID,
              isRestaurantWaiter: false,
              isRestaurantChef: false,
            },
          })
          .then(() => {
            console.log('Updated to Restaurant Admin');
            status = true;
          })
          .catch(error => {
            console.log(error);
            status = false;
          });
      });
      return status;
    } catch (error) {
      return false;
    }
  }
}

export const superAdmin = new SuperAdminService();

// localId
