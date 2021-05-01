// import HttpException from '../exceptions/HttpException';

import { dbConfig } from '../database';

class TableService {
  generateTableOTP(tableID: string | number, restaurantID: string): unknown {
    return { tableID, restaurantID };
  }
}

export const tableService = new TableService();
