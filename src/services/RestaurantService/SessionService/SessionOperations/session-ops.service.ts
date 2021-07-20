import * as admin from 'firebase-admin';
import { ORDERS, RESTAURANTS, SESSIONS } from '../../../../constants';
import { dbConfig } from '../../../../database';
import { SessionBillStatus } from '../../../../enums/sessionStatus.enum';
import HttpException from '../../../../exceptions/HttpException';
import { IUserSession } from '../../../../interfaces/common.interface';
import { IFinalBill } from '../../../../interfaces/orderBill.interface';

interface ISessionOperations {
  getTableSessionDetails(): null;
  getAllSessions();
  updateSessionMembers(sessionID: string, memberID: string, memberName: string): Promise<FirebaseFirestore.WriteResult>;
  updateSessionOrders(sessionID: string, orderID: string): Promise<FirebaseFirestore.WriteResult>;
  getSessionExistenceStatus(sessionID: string): Promise<boolean>;
  getSession(sessionID: string): Promise<IUserSession>;
}

export class SessionOperations implements ISessionOperations {
  constructor(private _restaurantID: string, private _tableID?: string) {}

  getTableSessionDetails() {
    return null;
  }

  getAllSessions() {
    return null;
  }

  async updateSessionBill(sessionID: string, bill: IFinalBill): Promise<boolean> {
    await dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(SESSIONS)
      .doc(sessionID)
      .update({ billDetails: bill, status: SessionBillStatus.GENERATED });
    return true;
  }

  async updateSessionMembers(
    sessionID: string,
    memberID: string,
    memberName: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    const sessionRef = dbConfig().collection(RESTAURANTS).doc(this._restaurantID).collection(SESSIONS).doc(sessionID);

    const unionRes = await sessionRef.update({
      members: admin.firestore.FieldValue.arrayUnion({ member_id: memberID, member_name: memberName }),
    });

    return unionRes;
  }

  async updateSessionOrders(sessionID: string, orderID: string): Promise<FirebaseFirestore.WriteResult> {
    const sessionRef = await dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(SESSIONS)
      .doc(sessionID);

    const unionRes = await sessionRef.update({
      orders: admin.firestore.FieldValue.arrayUnion(
        dbConfig().doc(`/${RESTAURANTS}/${this._restaurantID}/${ORDERS}/${orderID}`),
      ),
    });

    return unionRes;
  }

  async getSessionExistenceStatus(sessionID: string): Promise<boolean> {
    const sessionDocRef = dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(SESSIONS)
      .doc(sessionID);
    const session = await sessionDocRef.get();
    if (!session.exists) {
      return false;
    } else {
      return true;
    }
  }

  getSession = async (sessionID: string): Promise<IUserSession> => {
    const session = await dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(SESSIONS)
      .doc(sessionID)
      .get();

    if (!session.exists) throw new HttpException(400, 'Invalid Session ID');
    return session.data() as IUserSession;
  };
}
