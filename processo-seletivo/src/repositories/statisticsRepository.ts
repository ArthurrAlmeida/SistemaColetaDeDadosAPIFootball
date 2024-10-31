
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { statistics } from '../entities/statistics';

@Injectable()
export class statisticsRepository {
  constructor(
    @InjectRepository(statistics)
    private statisticsRepository: Repository<statistics>,
  ) {}

  async create(game:number, homeShotsTotal:number, visitedShotsTotal:number, homeShotsOnGoal:number, visitedShotsOnGoal:number, homeShotsOffGoal:number, visitedShotsOffGoal:number, homeFouls:number, visitedFouls:number, homeCorners:number, visitedCorners:number, homeBallPossession:number, visitedBallPossession:number, homeYellowCards:number, visitedYellowCards:number, homePenalty:number, visitedPenalty:number):Promise<statistics>{
    return await this.statisticsRepository.save({game, visitedShotsTotal, homeShotsTotal, homeShotsOnGoal, visitedShotsOnGoal, homeShotsOffGoal, visitedShotsOffGoal, homeFouls, visitedFouls, homeCorners, visitedCorners, homeBallPossession, visitedBallPossession, homeYellowCards, visitedYellowCards, homePenalty, visitedPenalty})
  }

  findAll(): Promise<statistics[]> {
    return this.statisticsRepository.find();
  }

  async get(
    where: object | object[],
    relations?: string[],
  ): Promise<statistics> {
    return await this.statisticsRepository.findOne({
      where,
      relations,
    });
  }

  async remove(id: number): Promise<void> {
    await this.statisticsRepository.delete(id);
  }
}
