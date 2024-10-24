import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { game } from './game';

@Entity('statistics')
export class statistics {

  @PrimaryColumn({type:'smallint', name:'game'})
  game: number

  @Column({type:'smallint', name:'homeShotsTotal'})
  homeShotsTotal: number;

  @Column({type:'smallint', name:'visitedShotsTotal'})
  visitedShotsTotal: number;

  @Column({type:'smallint', name:'homeShotsOnGoal'})
  homeShotsOnGoal: number;

  @Column({type:'smallint', name:'visitedShotsOnGoal'})
  visitedShotsOnGoal: number;

  @Column({type:'smallint', name:'homeShotsOffGoal'})
  homeShotsOffGoal: number;

  @Column({type:'smallint', name:'visitedShotsOffGoal'})
  visitedShotsOffGoal: number;
  
  @Column({type:'smallint', name:'homeFouls'})
  homeFouls: number;

  @Column({type:'smallint', name:'visitedFouls'})
  visitedFouls: number;

  @Column({type:'smallint', name:'homeCorners'})
  homeCorners: number;

  @Column({type:'smallint', name:'visitedCorners'})
  visitedCorners: number;

  @Column({type:'smallint', name:'homeBallPossession'})
  homeBallPossession: number;

  @Column({type:'smallint', name:'visitedBallPossession'})
  visitedBallPossession: number;

  @Column({type:'smallint', name:'homeYellowCards'})
  homeYellowCards: number;

  @Column({type:'smallint', name:'visitedYellowCards'})
  visitedYellowCards: number;

  @Column({type:'smallint', name:'homeRedCards'})
  homeRedCards: number;

  @Column({type:'smallint', name:'visitedRedCards'})
  visitedRedCards: number;

  @CreateDateColumn({type:'timestamp', name:'createdAt'})
  createdAt: Date;

  @UpdateDateColumn({type:'timestamp', name:'updatedAt'})
  updatedAt: Date;

  @ManyToOne(() => game, (game) => game.statistic)
  @JoinColumn({name: 'game', referencedColumnName: 'id'})
  game_: game;
}