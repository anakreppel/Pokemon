import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeStoreService {

  private baseURL = 'http://localhost:4000/pokemons';

  private __pokemons: Pokemon[] = [];
  public current$ = new BehaviorSubject<Pokemon[]>([]);

  constructor(public http: HttpClient) { }
  getAllPokes(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseURL}`)
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
}


