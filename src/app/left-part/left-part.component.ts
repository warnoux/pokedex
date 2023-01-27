import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../model/pokemon';
import {PokedexService} from '../services/pokedex.service';

@Component({
  selector: 'app-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})
export class LeftPartComponent implements OnInit {

  @Input() pokemon!: Pokemon;
  @Input() isGameBoy!: boolean;
  @Input() isFootprint!: boolean;

  @Output() changePokemon = new EventEmitter<string>();
  showShiny: boolean;
  private isFemale!: boolean;

  constructor() {
    this.showShiny = false;
  }

  ngOnInit(): void {
  }

  increaseIdPokemon(): any {
    this.showShiny = false;
    this.changePokemon.emit('+');
  }

  decreaseIdPokemon(): any {
    this.showShiny = false;
    this.changePokemon.emit('-');
  }

  showImg(): any {
    if ( this.isGameBoy ) {
      if ( this.showShiny ) {
        return this.pokemon.sprites.front_shiny;
      }
      if ( this.isFemale ) {
        return this.pokemon.sprites.front_female;
      }
      return this.pokemon.sprites.front_default;
    } else if ( this.isFootprint) {
      return 'assets/img/footprints/' + this.pokemon.id + '.png';
    }

    return this.pokemon.sprites.other['official-artwork'].front_default;
  }

  changeShowShiny(): any {
    if ( this.isGameBoy ){
      this.showShiny = !this.showShiny;
    }
  }

  showWoman(val: boolean): any {
    this.showShiny = false;
    if ( this.pokemon.sprites?.front_female ){
      this.isFemale = val;
    }
  }

  onImgError(event: any): any {
      event.target.src = 'assets/img/footprints/error.png';
  }

  search($event: any): any {
    this.changePokemon.emit($event.target.value);
  }
}
