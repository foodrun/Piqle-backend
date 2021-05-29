import * as admin from 'firebase-admin';
import { config } from '../config/app.config';

export const initializeAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config.DB as admin.ServiceAccount),
    databaseURL: config.DB_URL,
  });
};

export const dbConfig = () => {
  const db = admin.firestore();
  console.log(db, 'dbs');
  return db;
};
