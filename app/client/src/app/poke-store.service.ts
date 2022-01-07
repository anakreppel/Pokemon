import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeStoreService {

  private baseURL = 'http://localhost:4000/pokemons';

  private apiURL = 'https://pokeapi.co/api/v2/pokemon/'

  private __pokemons: Pokemon[] = [];
  public current$ = new BehaviorSubject<Pokemon[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }
  getAllPokes(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseURL}`)
      .pipe(catchError(this.handleError<Pokemon[]>('getAllPokes', [])))
  }

  getOne(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiURL}${name}`).pipe(
      map(data => {
        let poke: Pokemon = {
          id: data.id,
          name: data.name.charAt(0).toLocaleUpperCase() + data.name.slice(1),
          front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`

        };
        return poke;
      })
    )
  }

  PostNewPoke(poke: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.baseURL, poke, this.httpOptions)
  }

  filterPokes(search: string) {
    const regexp = new RegExp(search, 'i');
    return this.current$.next(this.__pokemons.filter((data) => regexp.test(data.name)).sort((a, b) => a.id - b.id))
  }
  getPokemons() {
    this.getAllPokes().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      this.__pokemons = data;
      this.current$.next(data);
    });
  }
  postPokemon(poke: Pokemon) {
    this.PostNewPoke(poke as Pokemon).subscribe(
      data => this.__pokemons.push(data)
    )
  }

  containsPoke(poke: Pokemon) {
    let name = poke.name.toLowerCase;
    let list = this.__pokemons.filter(data => { data.name.toLocaleLowerCase === name });
    return list.length > 0 ? true : false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}


