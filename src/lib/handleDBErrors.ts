import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export function handleDBErrors(error: any, service: string): never {
  const logger = new Logger(service);

  logger.error(error.errmsg);

  console.log(error);
  if (error.code === '11000') {
    throw new BadRequestException(error.errmsg);
  }

  if (error.code === '23505') {
    throw new BadRequestException(error.errmsg);
  }

  if (error.code === 'error-001') {
    throw new BadRequestException(error.errmsg);
  }

  throw new InternalServerErrorException('Please check server logs');
}
