import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string [] = [];
  private apiKey:       string = 'HTDqPeDonsGHXBgtW8OnyitR3l5O7Pdh';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { }

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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10')

    this.http.get(`${ this.serviceUrl }/search?`, { params } )
      .subscribe( resp => {

        console.log( resp);

      });

    //this._tagsHistory.unshift( tag );
    //console.log(this._tagsHistory);
  }



}
