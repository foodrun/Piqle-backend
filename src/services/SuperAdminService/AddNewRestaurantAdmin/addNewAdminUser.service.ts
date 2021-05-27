import {
  AdminAddUserToGroupRequest,
  AdminCreateUserRequest,
  AdminCreateUserResponse,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { config } from '../../../config/app.config';
import { ADMINS, AWSCognito } from '../../../constants';
import HttpException from '../../../exceptions/HttpException';
import { IRestaurantAdminDetails } from '../../../interfaces/restaurant-admin.interface';

class SuperAdminAddNewRestaurantAdminService {
  public async addNewRestaurantAdmin(restaurantAdminUser: IRestaurantAdminDetails): Promise<string> {
    const params = <AdminCreateUserRequest>{
      UserPoolId: config.AUTH.cognitoUserPoolId,
      Username: restaurantAdminUser.username,
      DesiredDeliveryMediums: ['SMS', 'EMAIL'],
      TemporaryPassword: restaurantAdminUser.password,
      UserAttributes: [
        { Name: 'custom:restaurantID', Value: restaurantAdminUser.restaurantID },
        { Name: 'email', Value: restaurantAdminUser.email },
        { Name: 'phone_number', Value: restaurantAdminUser.phoneNumber },
      ],
    };
    const userCreationResponse = <AdminCreateUserResponse>await AWSCognito.adminCreateUser(params).promise();
    console.log(userCreationResponse.User.UserStatus, 'userCreationResponse.User.UserStatus');
    if (userCreationResponse.User.UserStatus === 'FORCE_CHANGE_PASSWORD') {
      const params = <AdminAddUserToGroupRequest>{
        GroupName: ADMINS,
        UserPoolId: config.AUTH.cognitoUserPoolId,
        Username: restaurantAdminUser.username,
      };

      const addUserToGroupResponse = await AWSCognito.adminAddUserToGroup(params).promise();
      console.log(addUserToGroupResponse);
      if (addUserToGroupResponse) {
        return userCreationResponse.User.UserStatus;
      } else {
        throw new HttpException(500, 'Something went wrong');
      }
    }
  }
}

export const superAdminAddRestaurantAdmin = new SuperAdminAddNewRestaurantAdminService();
