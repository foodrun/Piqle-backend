import * as AWS from 'aws-sdk';
import { config } from './config/app.config';

export const MIN_OTP_VALUE = 1000;
export const MAX_OTP_VALUE = 9999;

export const RESTAURANTS = 'restaurants';
export const TABLES = 'tables';
export const SESSIONS = 'sessions';
export const ORDERS = 'orders';
export const USERS = 'users';

export const NOT_REQUESTED = 'Table information not requested';
export const FOOD_RUN_ADMIN = 'foodRunAdmins';
export const ADMINS = 'admins';
export const WAITERS = 'waiters';
export const CHEFS = 'chefs';

export const GROUPS = [ADMINS, WAITERS, CHEFS];

export const FOOD_DATA = 'food_data';
export const DRINKS_DATA = 'drinks_data';

export const PLACED = 'placed';
export const INPREPARATION = 'inpreparation';
export const DELIVERED = 'delivered';
export const CANCELLED = 'cancelled';
export const DECLINED = 'declined';

const env = process.env.NODE_ENV;

const AWSRegion = { region: config.AUTH.region };

if (env === 'local') {
  AWS.config.accessKeyId = config.AUTH.access_key;
  AWS.config.secretAccessKey = config.AUTH.secret_key;
}

export const AWSSECRETAMANAGER = new AWS.SecretsManager(AWSRegion);
export const AWSCognito = new AWS.CognitoIdentityServiceProvider(AWSRegion);

export const BUCKET_NAME = 'foodrun-restaurants-data';
