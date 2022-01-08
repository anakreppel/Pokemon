import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeStoreService } from '../poke-store.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit, OnDestroy {

  list?: Pokemon[];

  listSubscription?: Subscription;

  listed = !this.server.list$.value;


  constructor(private server: PokeStoreService) { }

  ngOnInit(): void {
    this.listSubscription = this.server.current$.subscribe(data => this.list = data);
  }
  ngOnDestroy(): void {
    this.listSubscription?.unsubscribe();
  }

}
