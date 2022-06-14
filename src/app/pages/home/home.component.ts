import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

export interface Pokemon {
  name: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  dangerousPokemons: Pokemon[] = [
    {
      name: 'mewtwo',
      url: 'https://pokeapi.co/api/v2/pokemon/mewtwo',
    },
    {
      name: 'yveltal',
      url: 'https://pokeapi.co/api/v2/pokemon/yveltal',
    },
    {
      name: 'gyarados',
      url: 'https://pokeapi.co/api/v2/pokemon/gyarados',
    },
    {
      name: 'banette',
      url: 'https://pokeapi.co/api/v2/pokemon/banette',
    },
    {
      name: 'ditto',
      url: 'https://pokeapi.co/api/v2/pokemon/ditto',
    },
  ];
  isLoading: boolean = false;
  limit: number = 5;
  offset: number = 0;
  count: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonsByPagination();
  }

  getPokemonsByPagination() {
    this.isLoading = true;
    this.pokemonService
      .getPokemonsByPagination(this.limit, this.offset)
      .subscribe((data: any) => {
        this.pokemons = data?.results;
        this.count = data?.count;
        this.totalPages = Math.ceil(this.count / this.limit);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }

  counter(i: number) {
    return new Array(i);
  }

  handleNext() {
    this.offset += this.limit;
    this.currentPage++;
    this.getPokemonsByPagination();
  }

  handlePrev() {
    this.offset -= this.limit;
    this.currentPage--;
    this.getPokemonsByPagination();
  }
}
