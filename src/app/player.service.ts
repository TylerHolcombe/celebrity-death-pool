import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AppSettings } from './app-settings';
import { Celebrity, Entry, Player } from './player';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private serviceEndpoint: string = environment.serviceEndpoint;

  constructor(private http: HttpClient) { }

  getApprovedEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.serviceEndpoint + '/entries/approved')
      .pipe(
        tap(_ => this.log('fetched approved entries')),
        map(entries => entries.map(entry => this.mapResultToEntry(entry))),
        catchError(this.handleError<Entry[]>('getApprovedEntries'))
      );
  }

  getPendingEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.serviceEndpoint + '/entries/unapproved')
      .pipe(
        tap(_ => this.log('fetched unapproved entries')),
        map(entries => entries.map(entry => this.mapResultToEntry(entry))),
        catchError(this.handleError<Entry[]>('getPendingEntries'))
      );
  }

  getCelebrities(): Observable<Celebrity[]> {
    return of([]);
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

  private mapResultToEntry(result: any): Entry {
    let entry: Entry = new Entry();
    entry.points = 0;
    entry.isApproved = result.approved;
    entry.isPaid = result.paid;
    entry.player = this.mapResultToPlayer(result.player);
    entry.selections = [];
    if (result.selections) {
      // Using for (let celebs in result.selections) interpreted the object as a string
      for (let i = 0; i < result.selections.length; i++) {
        let celeb = result.selections[i];
        entry.selections.push(this.mapResultToCelebrity(celeb));
        if (celeb.dead) {
          entry.points += celeb.wildcard ? AppSettings.WILDCARD_VALUE : AppSettings.STANDARD_VALUE;
        }
      }
    }
    return entry;
  }

  private mapResultToPlayer(result: any): Player {
    let player: Player = new Player();
    player.firstname = result.firstName;
    player.lastname = result.lastName;
    player.email = result.emailAddress;
    player.entries = [];
    for (let entry in result.entries) {
      player.entries.push(this.mapResultToEntry(entry));
    }
    return player;
  }

  private mapResultToCelebrity(result: any): Celebrity {
    let celeb: Celebrity = new Celebrity();
    celeb.name = result.celebrityName;
    celeb.isDead = result.dead;
    celeb.isWildcard = result.wildcard;
    return celeb;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  // TODO: consider using a message service to send logs to server
  /** Log a message */
  private log(message: string) {
    console.log(`PlayerService: ${message}`);
  }
}
