import { Injectable } from '@angular/core';

import { players } from './data/data'
import { Player, Celebrity } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getAllPlayers(): Player[] {
    return this.players.filter(player => {
      return player.isApproved;
    });
  }

  getPendingPlayers(): Player[] {
    return this.players.filter(player => {
      return !player.isApproved;
    });
  }

  // TODO: remove mocked data for an actual data source
  private players: Player[] = players;
}
