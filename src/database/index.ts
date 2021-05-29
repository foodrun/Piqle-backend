import * as admin from 'firebase-admin';
import { config } from '../config/app.config';

export const initializeAdmin = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(config.DB as admin.ServiceAccount),
      databaseURL: config.DB_URL,
    });
  } catch (error) {
    console.log(error, 'init error');
  }
};

export const dbConfig = () => {
  const db = admin.firestore();
  console.log(db, 'dbs');
  return db;
};
