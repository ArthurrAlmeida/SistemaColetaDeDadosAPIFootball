import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from './entities';
import { ScheduleModule } from '@nestjs/schedule';

import { player } from './entities/player';
import { team } from './entities/team';
import { lineUp } from './entities/lineUp';
import { game } from './entities/game';
import { statistics } from './entities/statistics';

import { playerRepository } from './repositories/playerRepository';
import { teamRepository } from './repositories/teamRepository';
import { lineUpRepository } from './repositories/lineUpRepository';
import { gameRepository } from './repositories/gameRepository';
import { statisticsRepository } from './repositories/statisticsRepository';
import { getGameDay } from './useCases/getGameDay';
import { UsersModule } from './users/users.module';

import teamController from './controllers/teamController';
import getTeamService from './useCases/getTeamService';
import listTeamService from './useCases/listTeamService';
import playerController from './controllers/playerController';
import getPlayerService from './useCases/getPlayerService';
import listPlayerService from './useCases/listPlayerService';
import listGameService from './useCases/listGameService';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'thm',
      entities: Entities,
      synchronize: true,
      logging: false
    }),
    TypeOrmModule.forFeature([player, 
      team, 
      lineUp, 
      game, 
      statistics]),
    ScheduleModule.forRoot(),
    UsersModule
  ],
  controllers: [AppController, teamController, playerController],
  providers: [AppService, 
    teamRepository, 
    playerRepository, 
    lineUpRepository, 
    gameRepository, 
    statisticsRepository,
    getTeamService,
    listTeamService,
    getPlayerService,
    listPlayerService, 
    getPlayerService,
    listGameService,
    getGameDay],
})
export class AppModule {}
