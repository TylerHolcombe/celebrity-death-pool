import { Injectable } from '@angular/core';

import { AppSettings } from './app-settings';
import { environment } from '../environments/environment';
import { players } from './data/data'
import { Player, Celebrity } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private serviceEndpoint: string = environment.serviceEndpoint;
  private servicePort: number = environment.servicePort;

  constructor() { }

  getApprovedPlayers(): Player[] {
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

  submitPlayer(name: string, email: string, celebs: string[], wildcards: string[]): string {
    status = this.validateCelebSubmissions(celebs);
    // TODO: Not fantastic to do string comparisons for statuses. Implement a proper status code and message system.
    if (status !== '') {
      return status;
    }
    status = this.validateWildcardSubmissions(wildcards);
    if (status !== '') {
      return status;
    }

    return this.commitPlayer(name, email, celebs, wildcards);
  }

  private validateCelebSubmissions(celebs: string[]): string {
    if (celebs.length !== AppSettings.NUM_PICKS) {
      return 'Invalid number of celebrities.';
    }
    return '';
  }

  private validateWildcardSubmissions(wildcards: string[]): string {
    if (wildcards.length !== AppSettings.NUM_WILDCARDS) {
      return 'Invalid number of celebrities.';
    }
    return '';
  }

  private commitPlayer(name: string, email: string, celebs: string[], wildcards: string[]) {
    // TODO: implement a DB commit here
    if (name === 'connection error') {
      return 'Failed to connect to the database. This may be temporary, please try again later.';
    }
    return '';
  }

  // TODO: remove mocked data for an actual data source
  private players: Player[] = players;
}
