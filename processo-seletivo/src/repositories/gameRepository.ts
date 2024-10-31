import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { game } from '../entities/game';

@Injectable()
export class gameRepository {
  constructor(
    @InjectRepository(game)
    private gamesRepository: Repository<game>,
  ) {}

  async create(competition:string, name:string, home:number, visited:number, stadium:string, scoreHome:number, scoreVisited:number, schedule:Date):Promise<game>{
    return await this.gamesRepository.save({competition, name, home, visited, stadium, scoreHome, scoreVisited, schedule})
  }

  findAll(): Promise<game[]> {
    return this.gamesRepository.find();
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<game[]> {
    return this.gamesRepository.find({
      where,
      relations,
      take,
      skip,
    });
  }

  async get(
    where: object | object[],
    relations?: string[],
  ): Promise<game> {
    return await this.gamesRepository.findOne({
      where,
      relations,
    });
  }

  async remove(id: number): Promise<void> {
    await this.gamesRepository.delete(id);
  }
}