import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from 'src/app/pages/home/home.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(`${environment.baseUrl}/pokemon`)
      .pipe(catchError(this.handleError<Pokemon[]>('getPokemons', [])));
  }

  getPokemonsByPagination(
    limit: number,
    offset: number
  ): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(
        `${environment.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      )
      .pipe(catchError(this.handleError<Pokemon[]>('getPokemons', [])));
  }

  getPokemon(name: string): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrl}/pokemon/${name}`)
      .pipe(catchError(this.handleError<any>('getPokemon', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`PokemonService: ${message}`);
  }
}
