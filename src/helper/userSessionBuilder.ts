import * as admin from 'firebase-admin';
import { RESTAURANTS, TABLES } from '../constants';
import { dbConfig } from '../database';
import { IUserSession } from '../interfaces/common.interface';

export const UserSessionBuilder = (
  member_id: string,
  member_name: string,
  table_identifier: string,
  table_number: number,
  restaurantID: string,
) => {
  const session = <IUserSession>{
    members: [{ member_id: member_id, member_name: member_name }],
    start_timestamp: admin.firestore.Timestamp.fromDate(new Date()),
    end_timestamp: null,
    orders: null,
    table_identifier: dbConfig().doc(`/${RESTAURANTS}/${restaurantID}/${TABLES}/${table_identifier}`),
    table_number: table_number,
    billDetails: null,
  };

  return session;
};
