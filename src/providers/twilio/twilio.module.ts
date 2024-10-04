import { Module } from '@nestjs/common';
import TwilioService from './twilio.service';
import TwilioController from './twilio.controller';
import { OtpModule } from 'src/otp/otp.module';

@Module({
    imports: [OtpModule],
    controllers: [TwilioController],
    providers: [TwilioService],
})
export class TwilioModule { }