import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeStoreService } from '../poke-store.service';


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  list?: Pokemon[];

  constructor(private server: PokeStoreService) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons() {
    this.server.getAllPokes().subscribe(data => this.list = data);
  }

}
