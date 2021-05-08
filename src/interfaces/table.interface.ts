export interface ITable {
  tableNumber: number;
  tableOTP: number;
  tableOccupied: boolean;
  tableKey: string;
}
export interface ITables {
  table: ITable;
}
