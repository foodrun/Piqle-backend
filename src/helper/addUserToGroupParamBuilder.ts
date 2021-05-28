import { AdminAddUserToGroupRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { config } from '../config/app.config';

export const AddUserToGroupParamBuilder = (groupName: string, userName: string): AdminAddUserToGroupRequest => {
  const params = <AdminAddUserToGroupRequest>{
    GroupName: groupName,
    UserPoolId: config.AUTH.cognitoUserPoolId,
    Username: userName,
  };

  return params;
};
