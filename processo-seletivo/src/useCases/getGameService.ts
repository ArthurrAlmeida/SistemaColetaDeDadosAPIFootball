import { Inject, HttpStatus } from '@nestjs/common';

import { gameRepository } from 'src/repositories/gameRepository';
import { game } from 'src/entities/game';

interface IRequest {
    id: number
}

class getGameService {
    constructor(
        @Inject(gameRepository) private gameRepository: gameRepository
    ) {}

    public async execute({id}:IRequest): Promise<game | {}>{
        const game = await this.gameRepository.get({}, [''])

        return game ? game : {}
    }
}


export default getGameService