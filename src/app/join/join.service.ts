import { Injectable } from '@angular/core';

import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  constructor() { }

  submitChoices(name: string, email: string, celebs: string[], wildcards: string[]): string {
    status = this.validateCelebs(celebs);
    // TODO: Not fantastic to do string comparisons for statuses. Implement a proper status code and message system.
    if (status !== '') {
      return status;
    }
    status = this.validateWildcards(wildcards);
    if (status !== '') {
      return status;
    }

    return this.commit(name, email, celebs, wildcards);
  }

  private validateCelebs(celebs: string[]): string {
    if (celebs.length !== AppSettings.NUM_PICKS) {
      return 'Invalid number of celebrities.';
    }
    return '';
  }

  private validateWildcards(wildcards: string[]): string {
    if (wildcards.length !== AppSettings.NUM_WILDCARDS) {
      return 'Invalid number of celebrities.';
    }
    return '';
  }

  private commit(name: string, email: string, celebs: string[], wildcards: string[]) {
    // TODO: implement a DB commit here
    if (name === 'connection error') {
      return 'Failed to connect to the database. This may be temporary, please try again later.';
    }
    return '';
  }
}
