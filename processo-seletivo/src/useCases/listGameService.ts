import { Inject, HttpStatus } from '@nestjs/common';

import { gameRepository } from 'src/repositories/gameRepository';
import { game } from 'src/entities/game';

class listGameService {
    constructor(
        @Inject(gameRepository) private gameRepository: gameRepository
    ) {}

    public async execute(): Promise<game[] | []>{
        const games = await this.gameRepository.list({}, [])

        return games ? games : []
    }
}

export default gameRepository