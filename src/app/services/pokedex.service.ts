import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pokemon, DetailPokemon} from '../model/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {  }

  getPokemon(id: number): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.baseUrl + 'pokemon/' +  id);
  }

  getPokemonDetail(id: number): Observable<DetailPokemon>{
    return this.http.get<DetailPokemon>(this.baseUrl + 'pokemon-species/' +  id);
  }
}
