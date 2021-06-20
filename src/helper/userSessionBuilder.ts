import * as admin from 'firebase-admin';
import { IUserSession } from '../interfaces/common.interface';

export const UserSessionBuilder = (
  member_id: string,
  member_name: string,
  table_identifier: string,
  table_number: number,
) => {
  const session = <IUserSession>{
    members: [{ member_id: member_id, member_name: member_name }],
    start_timestamp: admin.firestore.Timestamp.fromDate(new Date()),
    end_timestamp: null,
    orders: null,
    table_identifier,
    table_number: table_number,
  };

  return session;
};
