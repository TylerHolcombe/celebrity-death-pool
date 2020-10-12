import { Injectable } from '@angular/core';

import { Player, Celebrity } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getAllPlayers() {
    return this.players;
  }

  // TODO: remove mocked data for an actual data source
  private players: Player[] = [
    {name: 'Tyler', points: 2, celebs: [
      {name: 'Ryan Reynolds'},
      {name: 'Dan Levy'},
      {name: 'Harry Potter', isDead: true},
      {name: 'Donald Trump', isDead: true},
      {name: 'Patrick Stewart', isWildcard: true}
    ]},
    {name: 'Julie', points: 1, celebs: [
      {name: 'Hugh Jackman'},
      {name: 'Eugene Levy'},
      {name: 'Ron Weasley'},
      {name: 'Hillary Clinton', isDead: true},
      {name: 'Ian McKellen', isWildcard: true}
    ]},
  ];
}
