import * as AWS from 'aws-sdk';
import { config } from './config/app.config';

export const MIN_OTP_VALUE = 1000;
export const MAX_OTP_VALUE = 9999;
export const RESTAURANTS = 'restaurants';
export const TABLES = 'tables';
export const SESSIONS = 'sessions';

export const NOT_REQUESTED = 'Table information not requested';
export const FOOD_RUN_ADMIN = 'foodRunAdmins';
export const ADMINS = 'admins';
export const WAITERS = 'waiters';
export const CHEFS = 'chefs';

export const GROUPS = [ADMINS, WAITERS, CHEFS];

export const AWSCognito = new AWS.CognitoIdentityServiceProvider({
  region: config.AUTH.region,
  credentials: { secretAccessKey: config.AUTH.secret_key, accessKeyId: config.AUTH.access_key },
});
