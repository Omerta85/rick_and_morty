import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { LocationResult, Location } from '../../interfaces/location';
import { Observable, tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http:HttpClient) { }


  getMainLocations(): Observable<LocationResult[]>{
    return this.http.get<LocationResult[]>(`${base_url}/location/1,2,3,4,5`)
  }

  getAllLocations(): Observable<Location>{
    return this.http.get<Location>(`${base_url}/location`);
   }

   getPaginatedLocations(url:string ): Observable<Location>{
    return this.http.get<Location>(url);
   }
   getLocationsByName(name:string): Observable<Location>{
      return this.http.get<Location>(`${base_url}/location/?name=${name}`);
   }
   getLocationsByID(id:string): Observable<LocationResult>{
    return this.http.get<LocationResult>(`${base_url}/location/${id}`)
      .pipe(
        tap(resp =>{
          resp.residents = resp.residents.slice(0,19);
        })
      );
   }
}
