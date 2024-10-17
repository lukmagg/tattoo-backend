import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp, OtpModel } from './schemas/otp.schema';
import { OtpInput } from './dto/otp.input';
import { OtpObject } from './dto/otp.object';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name)
    private readonly otpRepository: OtpModel,
  ) {}

  async create(code: number, phone: string): Promise<OtpObject> {
    try {
      const now = new Date();
      const expire = new Date(now);
      expire.setMinutes(expire.getMinutes() + 5);

      const otpInput = {
        code,
        phone,
        expire,
      };

      const otp = await this.otpRepository.create(otpInput);

      return otp;
    } catch (error) {
      console.error(error);
    }
  }
}
