import { Body, Controller, Get, Post } from '@nestjs/common';
import TwilioService from './twilio.service';

@Controller()
export default class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Get()
  getHello(): string {
    return this.twilioService.getHello();
  }

  @Post('/SendOtp') // se ejecuta cuando el usuario llena el formulario de contacto
  async sendOtp(@Body() data: { phone: string }) {
    let prefix = 'whatsapp:+34';
    let phone = prefix.concat(data.phone);
    return await this.twilioService.sendOtp(phone);
  }

  @Post('/VerifyOtp') // se ejecuta cuando el usuario pone el codigo recivido
  async verifyOtp(
    @Body() data: { phone: string; otp: string },
  ): Promise<{ msg: string }> {
    let prefix = '+34';
    let phone = prefix.concat(data.phone);
    return await this.twilioService.verifyOtp(phone, data.otp);
  }
}
