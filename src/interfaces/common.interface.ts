export interface IAddUser {
  username: string;
  email: string;
  phoneNumber: string;
  group: string;
  restaurantID: string;
  password: string;
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
  orders: string;
  table_identifier: string;
  table_number: number;
}

export interface ISessionDetails {
  restaurantID: string;
  tableID: string;
  member_id: string;
  member_name: string;
}

export interface IStatus {
  success: boolean;
  sessionID: string | null;
}
