import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { team } from './team';
import { statistics } from './statistics'
import { lineUp } from './lineUp';

@Entity('game')
export class game {
  @PrimaryGeneratedColumn({type:'smallint', name:'id'})
  id: number;

  @Column({type:'character varying', name:'competition', length:255})
  competition: string;

  @Column({type:'character varying', name:'name', length:255})
  name: string;

  @Column({type:'smallint', name:'home'})
  home: number;

  @Column({type:'smallint', name:'visited'})
  visited: number;

  @Column({type:'character varying', name:'stadium', length:524})
  stadium: string;

  @Column({type:'smallint', name:'scoreHome'})
  scoreHome: number;

  @Column({type:'smallint', name:'scoreVisited'})
  scoreVisited: number;

  @CreateDateColumn({type:'timestamp', name:'createdAt'})
  createdAt: Date;

  @UpdateDateColumn({type:'timestamp', name:'updatedAt'})
  updatedAt: Date;

  @OneToMany(() => statistics, (statistics) => statistics.game_)
  statistic: statistics[]

  @OneToMany(() => lineUp, (lineUp) => lineUp.game_)
  lineUps: lineUp[]

  @ManyToOne(() => team, (team) => team.gameHome)
  @JoinColumn({name: 'home', referencedColumnName: 'id'})
  home_: team;

  @ManyToOne(() => team, (team) => team.gameVisited)
  @JoinColumn({name: 'visited', referencedColumnName: 'id'})
  visited_: team;

}