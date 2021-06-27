export interface ITable {
  tableNumber: number;
  tableOTP: number;
  tableOccupied: boolean;
  tableKey: string;
  currentSession: FirebaseFirestore.DocumentReference;
}
export interface ITables {
  table: ITable;
}
