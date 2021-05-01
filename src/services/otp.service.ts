import random from 'random';
import { MAX_OTP_VALUE, MIN_OTP_VALUE } from '../constants';

class OTPService {
  public generateUniqueCode(): number {
    const uniqueCode = random.int(MIN_OTP_VALUE, MAX_OTP_VALUE);
    return uniqueCode;
  }
}

export const otpService = new OTPService();
