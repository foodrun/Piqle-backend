import { AdminCreateUserRequest, AdminCreateUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { config } from '../../../config/app.config';
import { AWSCognito } from '../../../constants';
import { IRestaurantAdminDetails } from '../../../interfaces/restaurant-admin.interface';

class SuperAdminAddNewRestaurantAdminService {
  public async addNewRestaurantAdmin(restaurantAdminUser: IRestaurantAdminDetails): Promise<string> {
    const params = <AdminCreateUserRequest>{
      UserPoolId: config.AUTH.cognitoUserPoolId,
      Username: restaurantAdminUser.name,
      DesiredDeliveryMediums: ['SMS', 'EMAIL'],
      TemporaryPassword: restaurantAdminUser.password,
      UserAttributes: [
        { Name: 'custom:restaurantID', Value: restaurantAdminUser.restaurantID },
        { Name: 'email', Value: restaurantAdminUser.email },
        { Name: 'phone_number', Value: restaurantAdminUser.phoneNumber },
      ],
    };
    const userCreationResponse = <AdminCreateUserResponse>await AWSCognito.adminCreateUser(params).promise();
    return userCreationResponse.User.UserStatus;
  }
}

export const superAdminAddRestaurantAdmin = new SuperAdminAddNewRestaurantAdminService();
