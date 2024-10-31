import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';

import { playerRepository } from './repositories/playerRepository';
import { teamRepository } from './repositories/teamRepository';

@Injectable()
export class AppService {

  constructor(
    @Inject(playerRepository) private playerRepository: playerRepository,
    @Inject(teamRepository) private teamRepository: teamRepository
    ){}

  private readonly apiUrl = 'https://apiv3.apifootball.com/';
  private readonly apiKey = 'b04a34a2096046006fdab6231cb27c2cf95f4e60830ece7b9f9752db7accbe72';

  private api= axios.create({baseURL:this.apiUrl})

  async initApi(): Promise<void> {
     
    const response = await this.api.get(`?action=get_teams&league_id=302&APIkey=${this.apiKey}`).then((res)=>{return res.data})

    response.map(async (team) => {
      const teamRecord = await this.teamRepository.get({externalID: team.team_key}, ['players'])
      if (teamRecord){
        const existingPlayers = teamRecord.players;

        const newPlayers = team.players.filter(
          (player) => !existingPlayers.some((existingPlayer) => existingPlayer.externalID === player.player_key)
        );

        const playersToRemove = existingPlayers.filter(
          (existingPlayer) => !team.players.some((player) => player.player_key === existingPlayer.externalID)
        );

        await Promise.all(
          newPlayers.map(async(player) =>
            await this.playerRepository.create(
              teamRecord.id,
              player.player_key,
              player.player_name,
              player.player_number,
              player.player_birthdate
            )
          )
        );

        await Promise.all(
          playersToRemove.map(async(player) =>
            await this.playerRepository.remove( player.id )
          )
        );
      }
      else {
        const newTeam = await this.teamRepository.create(team.team_key, team.team_name, team.team_country, team.team_founded, team.venue.venue_name)

        team.players.map(async (player) => {
          await this.playerRepository.create(newTeam.id, player.player_key, player.player_name, player.player_number, player.player_birthdate)
        })
      }
    })
  }
}

