import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/rick-and-morty/services/characters.service';
import { LocationsService } from '../../../../services/locations.service';
import { switchMap } from 'rxjs';
import { LocationResult } from 'src/app/interfaces/location';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: []
})
export class ViewLocationComponent implements OnInit {
  public location?: LocationResult;
  public ResidentsNames: string[]=[];
  public loadingLocations:boolean = true;

  constructor(private ar: ActivatedRoute, private ls: LocationsService, private router: Router, private cs: CharactersService) { }

  ngOnInit(): void {
    this.ar.params.pipe(
      switchMap(({ id }) => this.ls.getLocationsByID(id))
    ).subscribe(location => {
      this.location = location;

      location.residents.forEach((character, i) => {
        this.cs.getCharacterName(character)
          .subscribe(name => {
            this.ResidentsNames![i] = name;
          } );
      })
      this.loadingLocations= false
    });
  } 


  goToCharacter(character: string) {
    const id = character.slice(42);
    if (id) {
      this.router.navigateByUrl(`/characters/${id}`);
    }
  }
}

