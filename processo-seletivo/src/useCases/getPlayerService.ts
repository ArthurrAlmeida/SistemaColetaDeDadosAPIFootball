import { Inject, HttpStatus } from '@nestjs/common';

import { playerRepository } from 'src/repositories/playerRepository';
import { player } from 'src/entities/player';

interface IRequest {
    id: number
}

class getPlayerService {
    constructor(
        @Inject(playerRepository) private playerRepository: playerRepository
    ) {}

    public async execute({id}:IRequest): Promise<player | {}>{
        const player = await this.playerRepository.get({id}, ['team_'])

        return player ? player : {}
    }
}



export default getPlayerService
