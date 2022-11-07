import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CharactersService } from 'src/app/rick-and-morty/services/characters.service';
import { EpisodesService } from 'src/app/rick-and-morty/services/episodes.service';
import { EpisodesResult } from '../../../../../interfaces/episodes';

@Component({
  selector: 'app-view-episode',
  templateUrl: './view-episode.component.html',
  styleUrls: []
})
export class ViewEpisodeComponent implements OnInit {
  public episode?: EpisodesResult;
  public episodeCharactersID?: string;
  public episodeCharacterNames: string[] = [];
  public loadingEpisodes:boolean =true;

  constructor(private ar: ActivatedRoute, private cs: CharactersService, private router: Router, private es: EpisodesService) { }

  ngOnInit(): void {

    this.ar.params.pipe(
      switchMap(({ id }) => this.es.getEpisodeById(id))
    ).subscribe(episode => {
      this.episode = episode;
      episode.characters.forEach((character, i) => {
        this.cs.getCharacterName(character)
          .subscribe(name => {
            this.episodeCharacterNames[i] = name;
          }
          )
      });
      this.loadingEpisodes = false;
    });
  }

  goToEpisodeCharacter(characterUrl:string){
    const id = characterUrl.slice(42);
      if (id) {
      this.router.navigateByUrl(`/characters/${id}`);
    }
  }
}
