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
  isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    // Start loader
    this.setIsLoading()
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemons = data?.results;
      // Hide loader
      this.setIsLoading()
      console.log(data?.results);
    });
  }

  setIsLoading() {
    this.isLoading = !this.isLoading;
  }
}
