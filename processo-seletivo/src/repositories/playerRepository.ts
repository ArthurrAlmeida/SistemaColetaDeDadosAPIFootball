
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { player } from '../entities/player';

@Injectable()
export class playerRepository {
  constructor(
    @InjectRepository(player)
    private playersRepository: Repository<player>,
  ) {}

  async create(team:number, externalID:string, fullname:string, number:string, birthdate:string):Promise<player>{
    return await this.playersRepository.save({team, externalID, fullname, number, birthdate})
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<player[]> {
    return this.playersRepository.find({
      where,
      relations,
      take,
      skip,
    });
  }

  async get(
    where: object | object[],
    relations?: string[],
  ): Promise<player> {
    return await this.playersRepository.findOne({
      where,
      relations,
    });
  }

  async remove(id: number): Promise<void> {
    await this.playersRepository.delete(id);
  }
}
