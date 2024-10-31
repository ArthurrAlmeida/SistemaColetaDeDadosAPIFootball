import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lineUp } from '../entities/lineUp';

@Injectable()
export class lineUpRepository {
  constructor(
    @InjectRepository(lineUp)
    private lineUpsRepository: Repository<lineUp>,
  ) {}

  async create(game:number, team:number, substitute:boolean, playerHome?:number, playerVisited?:number):Promise<lineUp>{
    const lineUp = this.lineUpsRepository.create({game, team, substitute, playerHome, playerVisited });
    return this.lineUpsRepository.save(lineUp);
  }

  findAll(): Promise<lineUp[]> {
    return this.lineUpsRepository.find();
  }

  async get(
    where: object | object[],
    relations?: string[],
  ): Promise<lineUp> {
    return await this.lineUpsRepository.findOne({
      where,
      relations,
    });
  }

  async remove(id: number): Promise<void> {
    await this.lineUpsRepository.delete(id);
  }
}