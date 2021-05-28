import { AdminCreateUserRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { config } from '../config/app.config';

export const CreateNewUserParamBuilder = (
  userName: string,
  password: string,
  restaurantID: string,
  email: string,
  phoneNumber: string,
): AdminCreateUserRequest => {
  const params = <AdminCreateUserRequest>{
    UserPoolId: config.AUTH.cognitoUserPoolId,
    Username: userName,
    DesiredDeliveryMediums: ['SMS', 'EMAIL'],
    TemporaryPassword: password,
    UserAttributes: [
      { Name: 'custom:restaurantID', Value: restaurantID },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phoneNumber },
    ],
  };

  return params;
};
