// import HttpException from '../exceptions/HttpException';
import random from 'random';

class OTPService {
  public generateUniqueCode(): number {
    const uniqueCode = random.int(1000, 9999);
    return uniqueCode;
  }
}

export const otpService = new OTPService();
