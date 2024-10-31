import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { team } from './team';
import { lineUp } from './lineUp';

@Entity('player')
export class player {
  @PrimaryGeneratedColumn({type:'smallint', name:'id'})
  id: number;

  @Column({type:'smallint', name:'team'})
  team: number

  @Column({type:'character varying', name:'externalID', length:16})
  externalID: string;

  @Column({type:'character varying', name:'fullname', length:255})
  fullname: string;

  @Column({type:'character varying', name:'number', length:16})
  number: string;

  @Column({type:'character varying', name:'birthdate', length:50})
  birthdate: string;

  @CreateDateColumn({type:'timestamp', name:'createdAt'})
  createdAt: Date;

  @UpdateDateColumn({type:'timestamp', name:'updatedAt'})
  updatedAt: Date;

  @ManyToOne(() => team, (team) => team.players)
  @JoinColumn({name: 'team', referencedColumnName: 'id'})
  team_: team;

  @OneToMany(() => lineUp, (lineUp) => lineUp.playerHome_)
  lineUpPlayerHome: lineUp[]

  @OneToMany(() => lineUp, (lineUp) => lineUp.playerVisited_)
  lineUpPlayerVisited: lineUp[]

}
