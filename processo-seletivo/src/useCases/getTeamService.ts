import { Inject, HttpStatus } from '@nestjs/common';

import { teamRepository } from 'src/repositories/teamRepository';
import { team } from 'src/entities/team';

interface IRequest {
    id: number
}

class getTeamService {
    constructor(
        @Inject(teamRepository) private teamRepository: teamRepository
    ) {}

    public async execute({id}:IRequest): Promise<team | {}>{
        const team = await this.teamRepository.get({id}, ['players', 'lineUp', 'lineUp.player'])

        return team ? team : {}
    }
}



export default getTeamService
