import { activateTableService } from './update/activateTable';

class TableService {
  public startUserSession(restaurant: string, tableId: string, user = 'Test User') {
    const activateTable = activateTableService.activateTable(tableId, restaurant);
    return activateTable;
  }
}

export const tableService = new TableService();
