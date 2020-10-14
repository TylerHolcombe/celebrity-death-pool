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
    let hasCeleb = {};
    let celebs = [];
    players.forEach(p => p.celebs.forEach(c => {
      if (!hasCeleb[c.name]) {
        hasCeleb[c.name] = true;
        celebs.push(c);
      }
    }));
    return celebs;
  }

  // TODO: remove mocked data for an actual data source
  private players: Player[] = players;
}
