import { Component, OnInit } from '@angular/core';
import { Pokemon } from './model/pokemon.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pokemon Gallery';
  imageUrl:string = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  pokemonResults:Pokemon[];

  stringToReplace:string = "https://pokeapi.co/api/v2/pokemon/";
  slashToReplace:string = "/";
  
  curPage : number = 1;
  pageSize : number = 20;
  showloader: boolean = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  
    this.getAllPokemons();
  }

  searchPokemon(event: any) {
    this.showloader=true;
    let searchString:string = event.target.value.trim();

    if(!searchString != null && searchString.length > 0) {     
        this.searchPokemons(searchString);
    } else {
        this.getAllPokemons();
    }
  }

  getAllPokemons() {
    this.http.get<Pokemon[]>(this.imageUrl).subscribe(data => {
      this.pokemonResults= data['results'];
      this.pokemonResults.forEach(element => {
       element.url = element.url.replace(this.stringToReplace,"").replace(this.slashToReplace,"");
       }); 

       this.showloader=false;
     });
  }

  searchPokemons(searchString:string) {
    this.http.get<Pokemon[]>(this.imageUrl).subscribe(data => {
      this.pokemonResults= data['results'];
      this.pokemonResults.forEach(element => {
       element.url = element.url.replace(this.stringToReplace,"").replace(this.slashToReplace,"");
       }); 

       if(this.pokemonResults.length > 0) {
        this.pokemonResults = this.pokemonResults.filter(
          pokemon => pokemon.name.includes(searchString));
      } 

      this.showloader=false;

     });
  }

  numberOfPages(){
    return Math.ceil(this.pokemonResults.length / this.pageSize);
  };
}
