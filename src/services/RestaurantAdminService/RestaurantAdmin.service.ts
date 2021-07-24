import HttpException from '../../exceptions/HttpException';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { config as conf } from '../../config/app.config';
import { tableOperations } from '../RestaurantService/TableService/TableOperations/table-operations.service';

class RestaurantAdminService {
  public async convertStaffToAdmin(uid: string, restaurantID: string): Promise<boolean> {
    if (!uid || !restaurantID) throw new HttpException(400, 'Invalid Input');
    try {
      admin
        .auth()
        .setCustomUserClaims(uid, {
          superAdmin: false,
          role: {
            isRestaurantAdmin: true,
            restaurantID: restaurantID,
            isRestaurantStaff: true,
          },
        })
        .then(() => {
          console.log('Updated to Restaurant Admin User');
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async addRestaurantStaffUserAndCustomAttributes(
    restaurantID: string,
    userName: string,
    password: string,
  ): Promise<boolean> {
    const data = JSON.stringify({
      email: userName,
      password: password,
      returnSecureToken: true,
    });
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
          isRestaurantAdmin: false,
          restaurantID: restaurantID,
          isRestaurantStaff: true,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async changeTableOccupationStatus(restaurantID: string, tableID: string, status: boolean): Promise<boolean> {
    if (!tableID || !restaurantID) throw new HttpException(400, 'Invalid Input');
    await tableOperations.getTable(restaurantID, tableID);
    const updateTable = await tableOperations.updateTable(restaurantID, tableID, 'table.tableOccupied', status, false);
    if (updateTable) return true;
  }
}

export const restaurantAdmin = new RestaurantAdminService();
