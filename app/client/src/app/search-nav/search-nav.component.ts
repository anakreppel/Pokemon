import { Component, OnInit } from '@angular/core';
import { PokeStoreService } from '../poke-store.service';




@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent implements OnInit {

  search?: string;

  constructor(private server: PokeStoreService) { }

  ngOnInit(): void {
  }
  onKeyUp(event: any) {
    this.search = event.target.value;
    if (this.search) {
      this.server.filterPokes(this.search);
    }
    else {
      this.server.filterPokes('');
    }
  }
}
