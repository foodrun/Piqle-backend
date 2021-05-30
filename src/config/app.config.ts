import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'develop') {
  dotenv.config({ path: 'config/development/.env' });
} else {
  dotenv.config();
}

const {
  PORT,
  NODE_ENV,
  PRIVATE_KEY,
  FIRESTORE_TYPE,
  FIRESTORE_PROJECT_ID,
  FIRESTORE_PRIVATE_KEY_ID,
  FIRESTORE_CLIENT_EMAIL,
  FIRESTORE_CLIENT_ID,
  FIRESTORE_AUTH_URI,
  FIRESTORE_TOKEN_URI,
  FIRESTORE_AUTH_PROVIDER_CERT_URL,
  FIRESTORE_CLIENT_CERT_URL,
  FIRESTORE_DB_URL,
  SENTRY_URL,
  REGION,
  cognitoUserPoolId,
  tokenUse,
  tokenExpiration,
  ACCESS_TOKEN,
  SECRET_KEY,
  serviceAccount,
} = process.env;

export const config = {
  application: {
    PORT: PORT,
    environment: NODE_ENV,
  },
  DB: serviceAccount,
  DB_URL: FIRESTORE_DB_URL,
  LOGGING: {
    sentry_url: SENTRY_URL,
  },
  AUTH: {
    access_key: ACCESS_TOKEN,
    secret_key: SECRET_KEY,
    region: REGION,
    cognitoUserPoolId: cognitoUserPoolId,
    tokenUse: tokenUse,
    tokenExpiration: tokenExpiration,
  },
};
