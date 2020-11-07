import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    return this.http.get<Entry[]>(this.serviceEndpoint + '/entries/approved').pipe(
      tap(_ => this.log('fetched approved entries')),
      catchError(this.handleError)
    );
  }

  getPendingEntries(): Observable<Entry[]> {
    return of([]);
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
