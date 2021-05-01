import * as admin from 'firebase-admin';
import path from 'path';
import { config } from '../config/app.config';

const serviceAccount = path.resolve(__dirname, '../../oota-cbff3-firebase-adminsdk-fil0x-881873ff3d.json');

export const dbConfig = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config.DB),
    databaseURL: 'https://oota-debug.firebaseio.com',
  });
  const db = admin.firestore();
  return db;
};
