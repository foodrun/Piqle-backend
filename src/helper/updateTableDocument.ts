import { RESTAURANTS, TABLES } from '../constants';
import { dbConfig } from '../database';

export const updateTableDocument = async (
  restaurantID: string,
  tableID: string,
  tableField: string,
  updateValue: any,
): Promise<void> => {
  await dbConfig()
    .collection(RESTAURANTS)
    .doc(restaurantID)
    .collection(TABLES)
    .doc(tableID)
    .update({ [`${tableField}`]: updateValue });
};
