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
    const table = await dbConfig().collection(RESTAURANTS).doc(restaurantID).collection(TABLES).doc(tableID).get();
    const tableInformation = <ITables>table.data();
    if (!tableInformation) throw new HttpException(404, 'Table Does Not Exist');

    this._tableInformation = tableInformation;
    return this._tableInformation;
  }
}

export const tableOperations = new TableOperations();
