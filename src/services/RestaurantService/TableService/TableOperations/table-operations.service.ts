import { RESTAURANTS, SESSIONS, TABLES } from '../../../../constants';
import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { ITables } from '../../../../interfaces/table.interface';

interface ITableOperations {
  updateTable<T>(
    restaurantID: string,
    tableID: string,
    key: string,
    value: T,
    reference: boolean,
  ): Promise<FirebaseFirestore.WriteResult>;
  getTable(restaurantID: string, tableID: string): Promise<ITables | HttpException>;
}
class TableOperations implements ITableOperations {
  private _tableInformation: ITables;
  async updateTable<T>(restaurantID: string, tableID: string, key: string, value: T, reference: boolean) {
    const res = await dbConfig()
      .collection(RESTAURANTS)
      .doc(restaurantID)
      .collection(TABLES)
      .doc(tableID)
      .update({
        [key]: reference ? dbConfig().doc(`${RESTAURANTS}/${restaurantID}/${SESSIONS}/${value}`) : value,
      });
    return res;
  }

  async getTable(restaurantID: string, tableID: string): Promise<ITables> {
    const tables = await dbConfig().collection(RESTAURANTS).doc(restaurantID).collection(TABLES).get();
    const allRestaurantTableInformation = <ITables[]>tables.docs.map(docs => {
      return docs.data();
    });
    const tableExistsInformation = allRestaurantTableInformation.some(table => {
      if (table && table.table && table.table.tableKey) {
        return table.table.tableKey === tableID;
      }
    });
    if (!tableExistsInformation) throw new HttpException(404, 'Table Does Not Exist');

    const requestedTableInformation = <ITables[]>allRestaurantTableInformation.filter(table => {
      if (table && table.table && table.table.tableKey) {
        return table.table.tableKey === tableID;
      }
    });
    this._tableInformation = requestedTableInformation[0];
    return this._tableInformation;
  }
}

export const tableOperations = new TableOperations();
