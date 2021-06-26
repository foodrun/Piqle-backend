// import HttpException from '../exceptions/HttpException';

import { dbConfig } from '../database';

class TestService {
  async getAllObjects(): Promise<FirebaseFirestore.DocumentData> {
    const snapshot = await dbConfig().collection('restaurants').get();
    const data = snapshot.docs.map(doc => {
      const docData = doc.data();
      return docData;
    });
    return data;
  }
}

export const testService = new TestService();
