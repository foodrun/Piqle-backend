import * as AWS from 'aws-sdk';
import { config } from './config/app.config';

export const MIN_OTP_VALUE = 1000;
export const MAX_OTP_VALUE = 9999;
export const RESTAURANTS = 'restaurants';
export const TABLES = 'tables';
export const NOT_REQUESTED = 'Table information not requested';
export const FOOD_RUN_ADMIN = 'foodRunAdmins';

export const AWSCognito = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-south-1',
  credentials: { secretAccessKey: config.AUTH.secret_key, accessKeyId: config.AUTH.access_key },
});
