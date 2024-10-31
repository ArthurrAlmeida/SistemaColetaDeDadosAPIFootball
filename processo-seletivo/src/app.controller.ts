import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Cron } from '@nestjs/schedule';
import { getGameDay } from './useCases/getGameDay';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly getGameDay: getGameDay
  ) {}

  @Get()
  async initApi(): Promise<void> {
    await this.appService.initApi();
  }

  @Cron('*/2 * * * *')
  handleCron() {
    console.log('execute bd')
    this.getGameDay.execute();
  }
}
