import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any | null;
  isLoading: boolean = false;
  pokemonNameFromRoute: string = '';

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pokemonNameFromRoute: string | any = routeParams.get('pokemonName');
    this.pokemonNameFromRoute = pokemonNameFromRoute;
    this.getPokemon(pokemonNameFromRoute);
  }

  getPokemon(name: string): void {
    this.isLoading = true;
    this.pokemonService.getPokemon(name).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.isLoading = false;
      console.log(pokemon);
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
