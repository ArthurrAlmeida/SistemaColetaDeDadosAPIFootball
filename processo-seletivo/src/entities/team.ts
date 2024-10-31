import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { game } from './game';
import { player } from './player';
import { lineUp } from './lineUp';

@Entity('team')
export class team {
  @PrimaryGeneratedColumn({type:'smallint', name:'id'})
  id: number;

  @Column({type:'character varying', name:'externalID', length:16})
  externalID: string;

  @Column({type:'character varying', name:'name', length:255})
  name: string;

  @Column({type:'character varying', name:'country', length:255})
  country: string;

  @Column({type:'character varying', name:'founded', length:16})
  founded: string;

  @Column({type:'character varying', name:'stadium', length:524})
  stadium: string;

  @CreateDateColumn({type:'timestamp', name:'createdAt'})
  createdAt: Date;

  @UpdateDateColumn({type:'timestamp', name:'updatedAt'})
  updatedAt: Date;

  @OneToMany(() => game, (game) => game.home_)
  gameHome: game[]

  @OneToMany(() => game, (game) => game.visited_)
  gameVisited: game[]

  @OneToMany(() => player, (player) => player.team_)
  players: player[]

  @OneToMany(() => lineUp, (lineUp) => lineUp.team_)
  lineUps: lineUp[]
  
}