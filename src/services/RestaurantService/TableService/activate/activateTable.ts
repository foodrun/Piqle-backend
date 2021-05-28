import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { RESTAURANTS, SESSIONS, TABLES } from '../../../../constants';
import { updateTableDocument } from '../../../../helper/updateTableDocument';
import { ITables } from '../../../../interfaces/table.interface';
import { ISessionDetails, IStatus } from '../../../../interfaces/common.interface';
import { UserSessionBuilder } from '../../../../helper/userSessionBuilder';

interface IActivateTableService {
  activateTable(
    restaurantID: string,
    tableID: string,
    otp: number,
    memberID: string,
    memberName: string,
  ): Promise<IStatus>;
  getTableIfExists(restaurantID: string, tableID: string): Promise<ITables | HttpException>;
  checkIfTableActive(table: ITables): boolean;
  compareInputOTPWithDbOTP(table: ITables, otp: number): boolean;
  setTableInformation(table: ITables): void;
}

interface ICreatedSessionInformation {
  sessionID: string;
}

interface ICreateNewTableSession {
  createNewUserSession(tableInformation: ITables): Promise<ICreatedSessionInformation>;
}

export class ActivateTableService implements IActivateTableService {
  private _tableInformation: ITables;

  async activateTable(
    restaurantID: string,
    tableID: string,
    otp: number,
    memberID: string,
    memberName: string,
  ): Promise<IStatus> {
    const tableInformation = <ITables>await this.getTableIfExists(restaurantID, tableID);
    const isTableActive = this.checkIfTableActive(tableInformation);
    if (isTableActive) throw new HttpException(400, 'Bad Request - Table Already Active');
    const doesOTPMatch = this.compareInputOTPWithDbOTP(tableInformation, otp);
    if (doesOTPMatch) {
      await updateTableDocument(restaurantID, tableID, 'table.tableOccupied', true);
      const session = new CreateNewTableSession({
        restaurantID,
        tableID,
        member_id: memberID,
        member_name: memberName,
      });
      const tableData = await session.createNewUserSession(this._tableInformation);
      return { success: true, sessionID: tableData.sessionID };
    }
    return { success: false, sessionID: null };
  }

  async getTableIfExists(restaurantID: string, tableID: string): Promise<ITables | HttpException> {
    const tables = await dbConfig().collection(RESTAURANTS).doc(restaurantID).collection(TABLES).get();
    const allRestaurantTableInformation = <ITables[]>tables.docs.map(docs => {
      return docs.data();
    });
    const tableExistsInformation = allRestaurantTableInformation.some(table => table.table.tableKey === tableID);
    if (!tableExistsInformation) throw new HttpException(404, 'Table Does Not Exist');

    const requestedTableInformation = <ITables[]>(
      allRestaurantTableInformation.filter(table => table.table.tableKey === tableID)
    );
    this.setTableInformation(requestedTableInformation[0]);
    return this._tableInformation;
  }

  setTableInformation(table: ITables): void {
    this._tableInformation = table;
  }

  checkIfTableActive(table: ITables): boolean {
    const tableOccupiedStatus = table.table.tableOccupied;
    if (tableOccupiedStatus) return true;
    return false;
  }

  compareInputOTPWithDbOTP(table: ITables, otp: number): boolean {
    const doesMatchStatus = table.table.tableOTP === otp;
    if (doesMatchStatus) return true;
    return false;
  }
}

class CreateNewTableSession extends ActivateTableService implements ICreateNewTableSession {
  constructor(private sessionDetails: ISessionDetails) {
    super();
  }

  async createNewUserSession(tableInformation: ITables): Promise<ICreatedSessionInformation> {
    const { restaurantID, tableID: table_identifier, member_id, member_name } = this.sessionDetails;
    const { tableNumber } = tableInformation.table;

    const session = await dbConfig()
      .collection(RESTAURANTS)
      .doc(restaurantID)
      .collection(SESSIONS)
      .add(UserSessionBuilder(member_id, member_name, table_identifier, tableNumber));

    return { sessionID: session.id };
  }
}
