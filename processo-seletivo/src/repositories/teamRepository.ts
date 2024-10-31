import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { team } from '../entities/team';

@Injectable()
export class teamRepository {
  constructor(
    @InjectRepository(team)
    private teamsRepository: Repository<team>,
  ) {}

  async create(externalID:string, name:string, country:string, founded:string, stadium:string):Promise<team>{
    return await this.teamsRepository.save({externalID, name, country, founded, stadium})
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<team[]> {
    return this.teamsRepository.find({
      where,
      relations,
      take,
      skip,
    });
  }

  async get(
    where: object | object[],
    relations?: string[],
  ): Promise<team> {
    return await this.teamsRepository.findOne({
      where,
      relations,
    });
  }

  async remove(id: number): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}