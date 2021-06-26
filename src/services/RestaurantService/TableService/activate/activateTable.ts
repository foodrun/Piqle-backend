import { dbConfig } from '../../../../database';
import HttpException from '../../../../exceptions/HttpException';
import { RESTAURANTS, SESSIONS } from '../../../../constants';
import { updateTableDocument } from '../../../../helper/updateTableDocument';
import { ITables } from '../../../../interfaces/table.interface';
import { ISessionDetails, IStatus } from '../../../../interfaces/common.interface';
import { UserSessionBuilder } from '../../../../helper/userSessionBuilder';
import { tableOperations } from '../TableOperations/table-operations.service';
import { SessionOperations } from '../../SessionService/SessionOperations/session-ops.service';

interface IActivateTableService {
  activateTable(
    restaurantID: string,
    tableID: string,
    otp: number,
    memberID: string,
    memberName: string,
  ): Promise<IStatus>;
  checkIfTableActive(table: ITables): boolean;
  compareInputOTPWithDbOTP(table: ITables, otp: number): boolean;
}

interface ICreatedSessionInformation {
  sessionID: string;
}

interface ICreateNewTableSession {
  createNewUserSession(tableInformation: ITables): Promise<ICreatedSessionInformation>;
}

interface IMember {
  member_id: string;
  member_name: string;
}
interface ISession {
  members: IMember[];
  end_timestamp: FirebaseFirestore.Timestamp | null;
  start_timestamp: FirebaseFirestore.Timestamp | null;
  table_number: number;
  orders: null;
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
    const tableInformation = await tableOperations.getTable(restaurantID, tableID);
    this._tableInformation = tableInformation;
    const isTableActive = this.checkIfTableActive(this._tableInformation);
    if (isTableActive) {
      //Table Active Workflow - Join session
      if (!this.compareInputOTPWithDbOTP(this._tableInformation, otp)) {
        throw new HttpException(400, 'Incorrect OTP');
      } else {
        //Check if member ID is in Session
        if (this._tableInformation.table.currentSession) {
          const sessionInformation = <ISession>await (await this._tableInformation.table.currentSession.get()).data();
          const isMemberIDPresent = sessionInformation.members.find(member => member.member_id === memberID);
          if (!isMemberIDPresent) {
            const sessionOperations = new SessionOperations(restaurantID, tableID);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const sessionMemberUpdation = await sessionOperations.updateSessionMembers(
              this._tableInformation.table.currentSession.id,
              memberID,
              memberName,
            );
          }
          return { success: true, sessionID: this._tableInformation.table.currentSession.id };
        } else {
          throw new HttpException(400, 'Session Expired');
        }
      }
    }
    const doesOTPMatch = this.compareInputOTPWithDbOTP(this._tableInformation, otp);
    if (doesOTPMatch) {
      await updateTableDocument(restaurantID, tableID, 'table.tableOccupied', true);
      const session = new CreateNewTableSession({
        restaurantID,
        tableID,
        member_id: memberID,
        member_name: memberName,
      });
      const tableData = await session.createNewUserSession(this._tableInformation);
      await tableOperations.updateTable<string>(
        restaurantID,
        tableID,
        'table.currentSession',
        tableData.sessionID,
        true,
      );
      return { success: true, sessionID: tableData.sessionID };
    }
    return { success: false, sessionID: null };
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
      .add(UserSessionBuilder(member_id, member_name, table_identifier, tableNumber, restaurantID));

    return { sessionID: session.id };
  }
}
