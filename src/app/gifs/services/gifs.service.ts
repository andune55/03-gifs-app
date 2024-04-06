import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string [] = [];

  constructor() { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    //lo pasamos a minuscula
    tag = tag.toLowerCase();

    /*si _tagsHistory incluye el tag nuevo que estoy recibiendo como argumento
    lo elimino*/
    if ( this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }
    //Agrego el tag nuevo que estoy recibiendo como argumento en la 1ª posición
    this._tagsHistory.unshift( tag );

    //Limito a 10 el nº de tags
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  searchTag( tag: string ):void {

    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);
    //this._tagsHistory.unshift( tag );

    console.log(this._tagsHistory);

  }
}
