import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';
import { CharactersService } from '../../../../services/characters.service';
import { CharacterResult } from '../../../../../interfaces/character';
import { EpisodesService } from '../../../../services/episodes.service';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: []
})
export class ViewCharacterComponent implements OnInit {

  public character?: CharacterResult;
  public firstEpisodeID?:string;
  public firstEpisodeName?:string;
  public loadingCharacters: boolean = true;

  constructor(private ar: ActivatedRoute, private cs: CharactersService, private router: Router, private es:EpisodesService) { }

  ngOnInit(): void {

    this.ar.params.pipe(
      switchMap(({ id }) => this.cs.getCharacterPorId(id))
    ).subscribe(character => {
      this.character = character;
      this.firstEpisodeID = this.character.episode[0].slice(40);
      this.es.getEpisodeNameById(this.firstEpisodeID).subscribe(
        name =>{
          this.firstEpisodeName = name;
        }
      );
      this.loadingCharacters = false;
    });
  }

  goToLocation(charLocation: string) {
    const id = charLocation.slice(41);
    console.log(charLocation, " + ", id);
    if (id) {
      this.router.navigateByUrl(`/locations/${id}`);
    }
  }
  goToFirstAppearance(episodeUrl:string){
    const id = episodeUrl.slice(40);
    if (id) {
      this.router.navigateByUrl(`/episodes/${id}`);
    }
  }
}
