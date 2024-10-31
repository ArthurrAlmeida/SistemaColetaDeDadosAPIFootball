import {
    Body,
    Controller,
    Post,
    HttpStatus,
    Get,
    Param,
    Patch,
    HttpCode,
    Delete,
    UseGuards,
  } from '@nestjs/common';

import getTeamService from 'src/useCases/getTeamService';
import listTeamService from 'src/useCases/listTeamService';

import { team } from 'src/entities/team';

@Controller('teams')
class teamController {
    constructor(
        private readonly getTeamService: getTeamService,
        private readonly listTeamService: listTeamService
    ) {}

    @Get('/:id')
    public async get(@Param('id') id:string): Promise<team | {}> {
        const teamRecord = await this.getTeamService.execute({id: Number(id)})
        return teamRecord
    }

    @Get('/')
    public async list(): Promise<team[] | []> {
        const teamsRecord = await this.listTeamService.execute()
        return teamsRecord
    }
}

export default teamController