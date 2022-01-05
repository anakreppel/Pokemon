import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeStoreService {

  private baseURL = 'http://localhost:4000/pokemons';

  constructor(public http: HttpClient) { }
  getAllPokes(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseURL}`)
  }
}
