import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { team } from './team';
import { player } from './player';
import { game } from './game';

@Entity('lineUp')
export class lineUp {

  @PrimaryGeneratedColumn({type:'smallint', name:'id'})
  id: number;

  @Column({type:'smallint', name:'game'})
  game: number;

  @Column({type:'smallint', name:'playerHome', nullable:true})
  playerHome: number

  @Column({type:'smallint', name:'playerVisited', nullable:true})
  playerVisited: number

  @Column({type:'smallint', name:'team'})
  team: number

  @Column({type:'boolean', name:'substitute', default:false})
  substitute: boolean

  @CreateDateColumn({type:'timestamp', name:'createdAt'})
  createdAt: Date;

  @UpdateDateColumn({type:'timestamp', name:'updatedAt'})
  updatedAt: Date;

  @ManyToOne(() => game, (game) => game.lineUps)
  @JoinColumn({name: 'game', referencedColumnName: 'id'})
  game_: game;

  @ManyToOne(() => team, (team) => team.lineUps)
  @JoinColumn({name: 'team', referencedColumnName: 'id'})
  team_: team;

  @ManyToOne(() => player, (player) => player.lineUpPlayerHome)
  @JoinColumn({name: 'playerHome', referencedColumnName: 'id'})
  playerHome_: player;

  @ManyToOne(() => player, (player) => player.lineUpPlayerVisited)
  @JoinColumn({name: 'playerVisited', referencedColumnName: 'id'})
  playerVisited_: player;

}