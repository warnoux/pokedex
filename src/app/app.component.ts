import {Component, OnInit} from '@angular/core';
import {PokedexService} from './services/pokedex.service';
import {Pokemon} from './model/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'pokedex';
  idPokemon = 0;

  pokemon!: Pokemon;
  isGameBoy: boolean = false;
  isFootprint: boolean = false;

  constructor(private pokedexService: PokedexService) {
  }

  ngOnInit(): void {
    this.changePokemon('+');
  }

  changePokemon(event: string): any {
    if ( Number(event)){
      this.idPokemon = Number(event);
    } else {
      if (event === '+'){
        this.idPokemon++;
      } else if ( event === '-' ){
        this.idPokemon--;
      }
    }

    this.pokedexService.getPokemon(this.idPokemon).subscribe(value => {
      this.isGameBoy = false;
      this.pokemon = value;
      this.pokedexService.getPokemonDetail(this.idPokemon).subscribe(value2 => {
        this.pokemon.detail = value2;
      });
    });
  }

  showGameBoy($event: boolean): any {
    this.isGameBoy = $event;
  }

  showFootprint($event: boolean): any {
    this.isFootprint = $event;
  }
}
