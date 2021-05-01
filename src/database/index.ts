import * as admin from 'firebase-admin';
import { config } from '../config/app.config';

export const dbConfig = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config.DB),
    databaseURL: config.DB_URL,
  });
  const db = admin.firestore();
  return db;
};
