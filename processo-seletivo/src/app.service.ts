import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly apiUrl = 'https://apiv3.apifootball.com/';
  private readonly apiKey = 'b04a34a2096046006fdab6231cb27c2cf95f4e60830ece7b9f9752db7accbe72';

  private api= axios.create({baseURL:this.apiUrl})

  async getHello(): Promise<string> {
    try {
      const response = await this.api.get(`?action=get_teams&league_id=152&APIkey=${this.apiKey}`).then((res)=>console.log(res.data))
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error;
    }
    return 'Hello World!';
  }
}

