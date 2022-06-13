import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  @Input() pokemons: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
