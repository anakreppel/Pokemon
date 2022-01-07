import { Component, OnInit } from '@angular/core';
import { PokeStoreService } from '../poke-store.service';
import { Pokemon } from '../pokemon';

import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  poke?: Pokemon;

  newPoke = this.formBuilder.group({ name: '' });

  constructor(private formBuilder: FormBuilder, private service: PokeStoreService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.newPoke.value;
    let search = this.newPoke.value.name;
    this.service.getOne(`${search}`).subscribe(data => {
      this.poke = data
      console.log('this poke', this.poke);
      if (this.service.containsPoke(this.poke)) {
        console.log('you alredy have this one');
      }
      else {
        this.service.postPokemon(this.poke);
      }
    });
    this.newPoke.reset();
  }




}


