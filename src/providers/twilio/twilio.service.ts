import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import generateFourDigitCode from 'src/lib/generateFourDigitCode';
import { OtpService } from 'src/otp/otp.service';

import { Twilio } from 'twilio';


@Injectable()
export default class TwilioService {
    private twilioClient: Twilio;

    constructor(
        private readonly configService: ConfigService,
        private readonly otpService: OtpService
    ) {
        const accountSid = configService.get('TWILIO_ACCOUNT_SID');
        const authToken = configService.get('TWILIO_AUTH_TOKEN');

        this.twilioClient = new Twilio(accountSid, authToken);
    }

    getHello(): string {
        return '1009 Ushuaia';
    }


    async sendOtp(phone: string) {
        const accountSid = this.configService.get(
            'TWILIO_ACCOUNT_SID',
        )
        const authToken = this.configService.get(
            'TWILIO_AUTH_TOKEN',
        )
        const verificationSid = this.configService.get(
            'TWILIO_VERIFICATION_SERVICE_SID',
        )

        const client = require('twilio')(accountSid, authToken)

        const code = generateFourDigitCode()

        client.messages
            .create({
                body: `El codigo para finalizar tu reserva en www.1009tattoo.com es: ${code}`,
                //messagingServiceSid: verificationSid,
                from: 'whatsapp:+14155238886',
                to: phone
            })
            .then(message => {
                //console.log(message)
                this.otpService.create(code, phone)
            })
            .catch(error => console.error('Error al enviar el mensaje:', error));

    }

    async verifyOtp(phone: string, code: string) {
        const serviceSid = this.configService.get(
            'TWILIO_VERIFICATION_SERVICE_SID',
        );
        let msg = '';
        await this.twilioClient.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to: phone, code: code })
            .then((verification) => (msg = verification.status));
        return { msg: msg };
    }

}