// import HttpException from '../exceptions/HttpException';

class TestService {
  getAllObjects(): any {
    return { stage: 'test' };
  }
}

export const testService = new TestService();
