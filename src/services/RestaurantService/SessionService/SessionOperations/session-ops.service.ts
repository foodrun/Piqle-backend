import * as admin from 'firebase-admin';
import { ORDERS, RESTAURANTS, SESSIONS } from '../../../../constants';
import { dbConfig } from '../../../../database';

interface ISessionOperations {
  getTableSessionDetails(): null;
  getAllSessions();
  updateSessionMembers(sessionID: string, memberID: string, memberName: string): Promise<FirebaseFirestore.WriteResult>;
  updateSessionOrders(sessionID: string, orderID: string): Promise<FirebaseFirestore.WriteResult>;
}

export class SessionOperations implements ISessionOperations {
  constructor(private _restaurantID: string, private _tableID: string) {}

  getTableSessionDetails() {
    return null;
  }

  getAllSessions() {
    return null;
  }

  async updateSessionMembers(
    sessionID: string,
    memberID: string,
    memberName: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    const sessionRef = await dbConfig()
      .collection(RESTAURANTS)
      .doc(this._restaurantID)
      .collection(SESSIONS)
      .doc(sessionID);

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
}
