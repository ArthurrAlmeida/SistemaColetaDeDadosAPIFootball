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

import getPlayerService from 'src/useCases/getPlayerService';
import listPlayerService from 'src/useCases/listPlayerService';

import { player } from 'src/entities/player';

@Controller('players')
class playerController {
    constructor(
        private readonly getPlayerService: getPlayerService,
        private readonly listPlayerService: listPlayerService
    ) {}

    @Get('/:id')
    public async get(@Param('id') id:string): Promise<player | {}> {
        const playerRecord = await this.getPlayerService.execute({id: Number(id)})
        return playerRecord
    }

    @Get('/')
    public async list(): Promise<player[] | []> {
        const playersRecord = await this.listPlayerService.execute()
        return playersRecord
    }
}

export default playerController