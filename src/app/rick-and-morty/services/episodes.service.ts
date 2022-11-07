import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map, Observable, tap } from 'rxjs';
import { Episodes, EpisodesResult } from '../../interfaces/episodes';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) {

  }

  getEpisodecount(): Observable<number> {
    return this.http.get<Episodes>(`${base_url}/episode`)
      .pipe(
        map(resp => resp.info.count)
      )
  }

  getEpisodeById(id:string): Observable<EpisodesResult>{
    return this.http.get<EpisodesResult>(`${base_url}/episode/${id}`)
    .pipe(
      tap(resp =>{
        resp.characters = resp.characters.slice(0,19);
      })
    );;
 }

  getEpisodeNameById(id:string){
    return this.http.get<EpisodesResult>(`${base_url}/episode/${id}`)
    .pipe(
      map(episode =>{
        return episode.name;
      })
      );
 }


  getLatestEpisodes() {
    return this.http.get<Episodes>(`${base_url}/episode`)
      .pipe(
        map(
          resp => {
            let latest: EpisodesResult[] = [];
            for (let i = 0; i <= 4; i++) {
              latest.push(resp.results.pop()!)
            }
            return latest;
          }))
  }

  getAllEpisodes(): Observable<Episodes>{
    return this.http.get<Episodes>(`${base_url}/episode`);
   }

   getPaginatedEpisodes(url:string ){
    return this.http.get<Episodes>(url);
   }
   getEpisodesByName(name:string){
      return this.http.get<Episodes>(`${base_url}/episode/?name=${name}`);
   }


}
