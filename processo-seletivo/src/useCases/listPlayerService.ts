import { Inject, HttpStatus } from '@nestjs/common';

import { playerRepository } from 'src/repositories/playerRepository';
import { player } from 'src/entities/player';

class listPlayerService {
    constructor(
        @Inject(playerRepository) private playerRepository: playerRepository
    ) {}

    public async execute(): Promise<player[] | []>{
        const players = await this.playerRepository.list({}, [])

        return players ? players : []
    }
}

export default listPlayerService