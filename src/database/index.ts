import { SecretsManager } from 'aws-sdk';
import * as admin from 'firebase-admin';
// import { config } from '../config/app.config';
import { AWSSECRETAMANAGER } from '../constants';

export const initializeAdmin = async () => {
  let Secret: SecretsManager.GetSecretValueRequest;
  if (process.env.NODE_ENV === 'production') {
    Secret = { SecretId: '/production/piqle' };
  } else if (process.env.NODE_ENV === 'testing') {
    Secret = { SecretId: '/testing/piqle' };
  } else {
    Secret = { SecretId: '/dev/piqle' };
  }
  try {
    const creds = await AWSSECRETAMANAGER.getSecretValue(Secret).promise();
    if ('SecretString' in creds) {
      const secret = JSON.parse(creds.SecretString);
      admin.initializeApp({
        credential: admin.credential.cert(secret),
      });
    }
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

export const dbConfig = () => {
  const db = admin.firestore();
  return db;
};
