import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AppSettings } from './app-settings';
import { Celebrity, Entry, EntrySelection, Player } from './player';
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
    return this.http.get<Celebrity[]>(this.serviceEndpoint + '/celebrities')
      .pipe(
        tap(_ => this.log('fetched celebrities')),
        map(celebrities => celebrities.map(celebrity => Object.assign({}, celebrity))),
        catchError(this.handleError<Celebrity[]>('getCelebrities'))
      );
  }

  submitPlayer(firstName: string, lastName: string, email: string): Observable<bigint> {
    let player: Player = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email
    };
    return this.http.post<bigint>(this.serviceEndpoint + "/players", player)
      .pipe(
        tap(_ => this.log("committing player")),
        catchError(this.handleError<bigint>('commitPlayer'))
      );
  }

  submitEntry(playerId: bigint, celebs: string[], wildcards: string[]): Observable<bigint> {
    status = this.validateCelebSubmissions(celebs);
    status = this.validateWildcardSubmissions(wildcards);
    if (status !== '') {
      return this.createError<bigint>("submitEntry", status);
    }

    let selections: EntrySelection[] = [];
    for (let selection of celebs) {
      selections.push(this.mapSelection(selection, false));
    }
    for (let selection of wildcards) {
      selections.push(this.mapSelection(selection, true));
    }

    let entry: Entry = {
      approved: false,
      paid: false,
      player: {
        playerId: playerId
      },
      entrySelections: selections
    }

    return this.http.post<bigint>(this.serviceEndpoint + "/entries", entry)
      .pipe(
        tap(_ => this.log("committing entry")),
        catchError(this.handleError<bigint>('commitEntry'))
      );
  }

  private mapSelection(selection: string, wildcard: boolean): EntrySelection {
    let entrySelection: EntrySelection = {
      celebrity: {
        celebrityName: selection
      },
      wildcard: wildcard
    }
    return entrySelection;
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

  private mapResultToEntry(result: any): Entry {
    let entry: Entry = Object.assign({}, result);
    entry.points = this.calculatePoints(entry.entrySelections);
    return entry;
  }

  private calculatePoints(selections: EntrySelection[]): number {
    let points = 0;
    selections.forEach(selection => {
      if (selection.celebrity.dead) {
        points += selection.wildcard ? AppSettings.WILDCARD_VALUE : AppSettings.STANDARD_VALUE;
      }
    });

    return points;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private createError<T>(operation = 'operation', message = 'message', result?: T) {
    console.error(message);
    this.log(`${operation} failed: ${message}`);

    return of(result as T);
  }

  // TODO: consider using a message service to send logs to server
  /** Log a message */
  private log(message: string) {
    console.log(`PlayerService: ${message}`);
  }
}
