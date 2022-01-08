import { Component, OnInit } from '@angular/core';
import { PokeStoreService } from '../poke-store.service';
import { Pokemon } from '../pokemon';
import { BehaviorSubject } from 'rxjs';

import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  model: Pokemon = { id: 1, name: " ", front: " ", back: " " };

  model$ = new BehaviorSubject<Pokemon>(this.model);

  pokeName = this.formBuilder.group({ name: '' });

  posted = false;

  listed = this.server.list$.value;

  validPoke = false;

  constructor(private formBuilder: FormBuilder, private server: PokeStoreService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let search = this.pokeName.value.name.toLowerCase();
    this.findPoke(search);
    this.pokeName.reset();
    this.validPoke = false;
    this.server.filterPokes('');
  }
  onKeyUp(event: any) {
    let search = event.target.value.toLowerCase();
    if (search) {
      this.server.filterPokes(search);
      let length = this.server.listLength();
      if (length === 1) {
        let poke = this.server.current$.value[0];
        if (search === poke.name.toLowerCase()) {
          this.validPoke = true;
        }
      }
      if (this.server.getOne(`${search}`)) {
        this.validPoke = true;
      }
    }
    else {
      this.server.filterPokes('');
    }
  }

  findPoke(name: string) {

    if (this.server.listLength() === 1) {
      if (name === this.server.current$.value[0].name.toLowerCase()) {
        this.model$.next(this.server.current$.value[0]);
        this.server.list$.next(false);
        this.listed = this.server.list$.value;
        console.log(this.server.list$.value);
      }
      else {
        this.server.getOne(name).subscribe(data => {
          this.model$.next(data);
          if (this.model$.value.id !== 1) {
            this.posted = true;
          }
        })
      }
    }
    else {
      this.server.getOne(name).subscribe(data => {
        this.model$.next(data);
        if (this.model$.value.id !== 1) {
          this.posted = true;
        }
      })
    }
  }

  catch() {
    this.server.postPokemon(this.model$.value);
    this.model$.next(this.model)
    this.server.filterPokes('');
    this.posted = false;
  }

  backList() {
    this.server.filterPokes('');
    this.server.list$.next(true);
    this.listed = this.server.list$.value;
  }
  free() {
    this.model$.next(this.model)
    this.server.filterPokes('');
    this.posted = false;
  }

}


