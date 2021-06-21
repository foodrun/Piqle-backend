import { RESTAURANTS, TABLES } from '../../constants';
import { dbConfig } from '../../database';
import HttpException from '../../exceptions/HttpException';
import { ITables } from '../../interfaces/table.interface';

export const GetTableOccupationStatus = async (restaurantID: string, tableID: string): Promise<boolean> => {
  const tableInformation = await dbConfig()
    .collection(RESTAURANTS)
    .doc(restaurantID)
    .collection(TABLES)
    .doc(tableID)
    .get();
  if (!tableInformation.exists) {
    throw new HttpException(404, 'Table Does Not Exist');
  } else {
    const table = tableInformation.data() as ITables;
    return table.table.tableOccupied ? true : false;
  }
};
