import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Character, CharacterResult } from 'src/app/interfaces/character';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http:HttpClient) { }


  getPrincipalCharacters(): Observable<CharacterResult[]>{
    return this.http.get<CharacterResult[]>(`${base_url}/character/1,2,3,4,5`);
   }  

   getCharacterName(characterUrl:string): Observable<string>{
    return this.http.get<CharacterResult>(characterUrl)
    .pipe(
      map(character =>{
        return character.name;
      }));
   }

   getAllCharacters(): Observable<Character>{
    return this.http.get<Character>(`${base_url}/character`);
   }

   getPaginatedCharacters(url:string ){
    return this.http.get<Character>(url);
   }
   getCharactersByName(name:string){
      return this.http.get<Character>(`${base_url}/character/?name=${name}`);
   }
   getCharacterPorId(id:number){
      return this.http.get<CharacterResult>(`${base_url}/character/${id}`);
   }
}
