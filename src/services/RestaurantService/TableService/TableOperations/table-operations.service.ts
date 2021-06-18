import { RESTAURANTS, SESSIONS, TABLES } from '../../../../constants';
import { dbConfig } from '../../../../database';
import { logger } from '../../../../utils/logger';

class TableOperations {
  async updateTableContent<T>(restaurantID: string, tableID: string, key: string, value: T, reference: boolean) {
    const res = await dbConfig()
      .collection(RESTAURANTS)
      .doc(restaurantID)
      .collection(TABLES)
      .doc(tableID)
      .update({
        [key]: reference ? dbConfig().doc(`${RESTAURANTS}/${restaurantID}/${SESSIONS}/${value}`) : value,
      });

    logger.log('info', res);
    return res;
  }
}

export const tableOperations = new TableOperations();
