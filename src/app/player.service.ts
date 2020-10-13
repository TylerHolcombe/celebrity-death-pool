import { Injectable } from '@angular/core';

import { players } from './data/data'
import { Player, Celebrity } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getAllPlayers(): Player[] {
    return this.players;
  }

  getPendingPlayers(): Player[] {
    return this.pendingPlayers;
  }

  // TODO: remove mocked data for an actual data source
  private players: Player[] = players;
  private pendingPlayers: Player[] = [
    {"name":"Kelly Barlow","points":0,"celebs":[
      {"name":"Dustin Diamond","isWildcard":true,"isDead":false},
      {"name":"Jerry Van Dyke","isWildcard":false,"isDead":false},
      {"name":"June Foray","isWildcard":false,"isDead":false},
      {"name":"Kirk Douglas","isWildcard":false,"isDead":false},
      {"name":"Norman Lloyd","isWildcard":false,"isDead":false},
      {"name":"Zsa Zsa Gabor","isWildcard":false,"isDead":false}]
    }];
}
