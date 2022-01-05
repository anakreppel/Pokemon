import { Component, OnInit } from '@angular/core';
import { PokeStoreService } from './poke-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pokedex';
  constructor(private server: PokeStoreService) { }
  ngOnInit(): void {
    this.server.getPokemons();
  }
}
