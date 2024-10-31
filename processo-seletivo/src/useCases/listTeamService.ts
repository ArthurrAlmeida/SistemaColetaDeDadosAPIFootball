import { Inject, HttpStatus } from '@nestjs/common';

import { teamRepository } from 'src/repositories/teamRepository';
import { team } from 'src/entities/team';

class listTeamService {
    constructor(
        @Inject(teamRepository) private teamRepository: teamRepository
    ) {}

    public async execute(): Promise<team[] | []>{
        const teams = await this.teamRepository.list({}, ['players'])

        return teams ? teams : []
    }
}

export default listTeamService