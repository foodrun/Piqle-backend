import { IFinalBill } from './orderBill.interface';

export interface IAddUser {
  email: string;
  restaurantID: string;
  password: string;
  username?: string;
  phoneNumber?: string;
  userName: string;
}

export interface ITableActivateBody {
  restaurantID: string;
  tableID: string;
  otp: string;
  user: string;
  memberID: string;
  memberName: string;
}

export interface IUserSession {
  members: [{ member_id: string; member_name: string }];
  start_timestamp: FirebaseFirestore.Timestamp;
  end_timestamp: FirebaseFirestore.Timestamp;
  orders: Array<FirebaseFirestore.DocumentReference>;
  table_identifier: FirebaseFirestore.DocumentReference;
  table_number: number;
  billDetails: IFinalBill | null;
  status: string | null;
}

export interface ISessionDetails {
  restaurantID: string;
  tableID: string;
  member_id: string;
  member_name: string;
}

export interface IUser {
  memberID: string;
  memberName: string;
}

export interface IStatus {
  success: boolean;
  sessionID: string | null;
}
