import { AdminCreateUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { ADMINS, AWSCognito } from '../constants';
import { UserStatus } from '../enums/userStatus.enum';
import { AddUserToGroupParamBuilder } from '../helper/addUserToGroupParamBuilder';
import { CreateNewUserParamBuilder } from '../helper/createNewUserParamBuilder';
import { IAddUser } from '../interfaces/User.interface.ts';
import { logger } from '../utils/logger';

export class AddNewUser {
  constructor(private user: IAddUser) {}
  public async addNewUser(): Promise<boolean> {
    const { username, password, restaurantID, email, phoneNumber } = this.user;
    const userCreationResponse = <AdminCreateUserResponse>(
      await AWSCognito.adminCreateUser(
        CreateNewUserParamBuilder(username, password, restaurantID, email, phoneNumber),
      ).promise()
    );
    logger.log('info', userCreationResponse);
    if (userCreationResponse.User.UserStatus === UserStatus.CHANGE_PASSWORD) await this.addNewUserToGroup();
    return true;
  }

  public async addNewUserToGroup(): Promise<unknown> {
    const addUserToGroupResponse = await AWSCognito.adminAddUserToGroup(
      AddUserToGroupParamBuilder(ADMINS, this.user.username),
    ).promise();

    return addUserToGroupResponse;
  }
}
