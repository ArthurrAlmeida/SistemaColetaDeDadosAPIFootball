import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';

import { playerRepository } from '../repositories/playerRepository';
import { teamRepository } from '../repositories/teamRepository';
import { gameRepository } from '../repositories/gameRepository';
import { lineUpRepository } from '../repositories/lineUpRepository';
import { statisticsRepository } from '../repositories/statisticsRepository';

@Injectable()
export class getGameDay{
    constructor(
        @Inject(playerRepository) private playerRepository: playerRepository,
        @Inject(teamRepository) private teamRepository: teamRepository,
        @Inject(gameRepository) private gameRepository: gameRepository,
        @Inject(lineUpRepository) private lineUpRepository: lineUpRepository,
        @Inject(statisticsRepository) private statisticsRepository: statisticsRepository,
    ) {}

    private readonly apiUrl = 'https://apiv3.apifootball.com/';
    private readonly apiKey = 'b04a34a2096046006fdab6231cb27c2cf95f4e60830ece7b9f9752db7accbe72';

    private api= axios.create({baseURL:this.apiUrl})

    async execute(): Promise<void> {
        const today = new Date();
        const formattedDateFrom = '2024-08-15'
        const formattedDateTo = '2024-10-19'
        /*const formattedDate = today.toISOString().split('T')[0];*/
        const response = await this.api.get(`?action=get_events&from=${formattedDateFrom}&to=${formattedDateTo}&league_id=302&APIkey=${this.apiKey}`)
            .then((res) => {return res.data});

        response.map(async (game) => {
            const homeTeam = await this.teamRepository.get({externalID: game.match_hometeam_id})
            const visitedTeam = await this.teamRepository.get({externalID: game.match_awayteam_id})

            const newGame = await this.gameRepository.create(game.league_name, `${game.match_hometeam_name} VS ${game.match_awayteam_name}`, homeTeam.id, visitedTeam.id, game.match_stadium, game.match_hometeam_ft_score, game.match_awayteam_ft_score, game.match_date)
            console.log(newGame.schedule)
            await Promise.all(
                game.lineup.home.starting_lineups.map(async (lineupHome) => {
                  const player = await this.playerRepository.get({ externalID: lineupHome.player_key });
                  
                  player ? await this.lineUpRepository.create(newGame.id, homeTeam.id, false, player.id, null) : null 
                })
            );              

            await Promise.all(
                game.substitutions.home.map(async (lineupHome) => {
                    const player = await this.playerRepository.get({externalID: lineupHome.substitution_player_id.split('|')[1].trim()})
                    
                    player ? await this.lineUpRepository.create(newGame.id, homeTeam.id, true, player.id, null ) : null 
                })
            ); 

            await Promise.all(
                game.lineup.away.starting_lineups.map(async (lineupVisited) => {
                    const player = await this.playerRepository.get({externalID: lineupVisited.player_key})
                    
                    player ? await this.lineUpRepository.create(newGame.id, visitedTeam.id, false, null, player.id ) : null 
                })
            );

            await Promise.all(
                game.substitutions.away.map(async (lineupVisited) => {
                    const player = await this.playerRepository.get({externalID: lineupVisited.substitution_player_id.split('|')[1].trim()})
                    
                    player ? await this.lineUpRepository.create(newGame.id, visitedTeam.id, true, null, player.id ) : null 
                })
            );

            const homeShotsTotal = game.statistics.find((statistic) => statistic.type === 'Shots Total') ? game.statistics.find((statistic) => statistic.type === 'Shots Total').home : '0'
            const visitedShotsTotal = game.statistics.find((statistic) => statistic.type === 'Shots Total') ? game.statistics.find((statistic) => statistic.type === 'Shots Total').away : '0'

            const homeShotsOnGoal = game.statistics.find((statistic) => statistic.type === 'Shots On Goal') ? game.statistics.find((statistic) => statistic.type === 'Shots On Goal').home : '0'
            const visitedShotsOnGoal = game.statistics.find((statistic) => statistic.type === 'Shots On Goal') ? game.statistics.find((statistic) => statistic.type === 'Shots On Goal').away : '0'

            const homeShotsOffGoal = game.statistics.find((statistic) => statistic.type === 'Shots Off Goal') ? game.statistics.find((statistic) => statistic.type === 'Shots Off Goal').home : '0'
            const visitedShotsOffGoal = game.statistics.find((statistic) => statistic.type === 'Shots Off Goal') ? game.statistics.find((statistic) => statistic.type === 'Shots Off Goal').away : '0'

            const homeFouls = game.statistics.find((statistic) => statistic.type === 'Fouls') ? game.statistics.find((statistic) => statistic.type === 'Fouls').home : '0'
            const visitedFouls = game.statistics.find((statistic) => statistic.type === 'Fouls') ? game.statistics.find((statistic) => statistic.type === 'Fouls').away : '0'
            
            const homeCorners = game.statistics.find((statistic) => statistic.type === 'Corners') ? game.statistics.find((statistic) => statistic.type === 'Corners').home : '0'
            const visitedCorners = game.statistics.find((statistic) => statistic.type === 'Corners') ? game.statistics.find((statistic) => statistic.type === 'Corners').away : '0'

            const homeBallPossession = game.statistics.find((statistic) => statistic.type === 'Ball Possession') ? game.statistics.find((statistic) => statistic.type === 'Ball Possession').home : '0'
            const visitedBallPossession = game.statistics.find((statistic) => statistic.type === 'Ball Possession') ? game.statistics.find((statistic) => statistic.type === 'Ball Possession').away : '0'

            const homeYellowCards = game.statistics.find((statistic) => statistic.type === 'Yellow Cards') ? game.statistics.find((statistic) => statistic.type === 'Yellow Cards').home : '0'
            const visitedYellowCards = game.statistics.find((statistic) => statistic.type === 'Yellow Cards') ? game.statistics.find((statistic) => statistic.type === 'Yellow Cards').away : '0'

            const homePenaltis = game.statistics.find((statistic) => statistic.type === 'Penalty') ? game.statistics.find((statistic) => statistic.type === 'Penalty').home : '0'
            const visitedPenaltis = game.statistics.find((statistic) => statistic.type === 'Penalty') ? game.statistics.find((statistic) => statistic.type === 'Penalty').away : '0'

            
            await this.statisticsRepository.create(
                newGame.id, 
                Number(homeShotsTotal),
                Number(visitedShotsTotal),
                Number(homeShotsOnGoal),
                Number(visitedShotsOnGoal),
                Number(homeShotsOffGoal),
                Number(visitedShotsOffGoal),
                Number(homeFouls),
                Number(visitedFouls),
                Number(homeCorners),
                Number(visitedCorners),
                Number(homeBallPossession.split('%')[0]),
                Number(visitedBallPossession.split('%')[0]),
                Number(homeYellowCards),
                Number(visitedYellowCards),
                Number(homePenaltis),
                Number(visitedPenaltis)
            )
            
        })
        console.log('Sucess')
    }
    
}