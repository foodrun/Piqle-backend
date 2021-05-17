import 'dotenv/config';
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
} = process.env;

export const config = {
  application: {
    PORT: PORT,
    environment: NODE_ENV,
  },
  DB: {
    type: FIRESTORE_TYPE,
    project_id: FIRESTORE_PROJECT_ID,
    private_key_id: FIRESTORE_PRIVATE_KEY_ID,
    private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: FIRESTORE_CLIENT_EMAIL,
    client_id: FIRESTORE_CLIENT_ID,
    auth_uri: FIRESTORE_AUTH_URI,
    token_uri: FIRESTORE_TOKEN_URI,
    auth_provider_x509_cert_url: FIRESTORE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: FIRESTORE_CLIENT_CERT_URL,
  },
  DB_URL: FIRESTORE_DB_URL,
  LOGGING: {
    sentry_url: SENTRY_URL,
  },
  AUTH: {
    region: REGION,
    cognitoUserPoolId: cognitoUserPoolId,
    tokenUse: tokenUse,
    tokenExpiration: tokenExpiration,
  },
};
