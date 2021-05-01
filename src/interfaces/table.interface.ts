export interface ITable {
  tableNumber: number;
  tableOTP: number;
  tableOccupied: boolean;
  table_key: string;
}
export interface ITables {
  table: ITable;
}
