import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../model/pokemon';
import {StringService} from '../services/string.service';

@Component({
  selector: 'app-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit {

  idDescription: number = 0;
  _pokemon!: Pokemon;
  isActiveButtonGameBoy!: boolean;
  isActiveButtonHD!: boolean;

  @Output() eventShowGameBoy = new EventEmitter<boolean>();
  @Output() eventShowFootprint = new EventEmitter<boolean>();

  constructor(private stringService: StringService) { }

  @Input() set pokemon(pokemon: Pokemon) {
    this._pokemon = pokemon;
    this.resetButton();
    this.isActiveButtonHD = true;
    this.idDescription = 0;

  }

  get pokemon(): Pokemon {
    return this._pokemon;
  }

  activeButton(s: any): any{
    this.resetButton();

    if ( s === 'gb'){
      this.isActiveButtonGameBoy = true;
      this.eventShowGameBoy.emit(true);
    }

    if ( s === 'hd'){
      this.isActiveButtonHD = true;
      this.eventShowGameBoy.emit(false);
    }
  }

  ngOnInit(): void {
  }

  showFootPrint(): any {
    this.resetButton();
    this.eventShowFootprint.emit(true);
  }

  hideFootPrint(): any {
    this.eventShowFootprint.emit(false);
  }

  private resetButton(): any {
    this.isActiveButtonGameBoy = false;
    this.isActiveButtonHD = false;
    this.eventShowGameBoy.emit(false);
    this.hideFootPrint();
  }

  playSound(): any{
      const audio = new Audio();
      audio.src = 'https://play.pokemonshowdown.com/audio/cries/' + this.pokemon?.name?.toLowerCase() + '.mp3';
      audio.load();
      audio.play();
  }

  allFrenchDescription(): any {
    return this.pokemon?.detail?.flavor_text_entries?.filter(value => {
      return value?.language?.name === 'fr';
    });
  }

  frenchDescription(): any {
    return this.slugify(this.allFrenchDescription()[this.idDescription].flavor_text);
  }

  slugify(name: string): string {
    return this.stringService.slugify(name);
  }

  changeDescription(s: string): any {
    if ( s === '+'){
      this.idDescription++;
      if ( this.idDescription > (this.allFrenchDescription().length - 1)){
        this.idDescription = 0;
      }
    } else {
      this.idDescription--;
      if ( this.idDescription < 0){
        this.idDescription = this.allFrenchDescription().length - 1;
      }
    }
  }
}
