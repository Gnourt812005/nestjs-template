import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ExampleCron {
  private readonly logger = new Logger(ExampleCron.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.logger.log('Running scheduled task...');
    // TODO: implement
  }
}