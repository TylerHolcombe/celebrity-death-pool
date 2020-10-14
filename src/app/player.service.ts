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

  getCelebrities(): Celebrity[] {
    let celebs: Set<Celebrity> = new Set();
    this.players.forEach(p => p.celebs.forEach(c => celebs.add(c)));
    return Array.from(celebs.values());
  }

  // TODO: remove mocked data for an actual data source
  private players: Player[] = players;
}
