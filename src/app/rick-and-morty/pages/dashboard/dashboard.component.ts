import { Component, OnInit } from '@angular/core';


import { CharacterResult } from 'src/app/interfaces/character';
import { CharactersService } from '../../services/characters.service';
import { EpisodesResult } from '../../../interfaces/episodes';
import { EpisodesService } from '../../services/episodes.service';
import { LocationResult } from '../../../interfaces/location';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  public episodeCount: number = 0;
  public loadingCharacters: boolean = true;
  public loadingLocations: boolean = true;
  public loadingEpisodes: boolean = true;
  public mainCharacters: CharacterResult[] = [];
  public mainLocations: LocationResult[] = [];
  public latestEpisodes: EpisodesResult[] = [];

  constructor(private es: EpisodesService, private cs: CharactersService, private ls: LocationsService) { }

    ngOnInit(): void {
    this.es.getEpisodecount().subscribe(count => {
      this.episodeCount = count;
    });
    this.getMainCharacters();
    this.getMainLocations();
    this.getLatestEpisodes();
  }


  getMainCharacters() {
    this.cs.getPrincipalCharacters().subscribe(characters => {
      this.mainCharacters = characters;
      this.loadingCharacters = false;
    });
  }

  getMainLocations() {
    this.ls.getMainLocations().subscribe(locations => {
        this.mainLocations = locations;
        this.loadingLocations = false;

      });
  }
  getLatestEpisodes() {
    this.es.getLatestEpisodes().subscribe(episodes => {
      this.latestEpisodes = episodes;
      this.loadingEpisodes = false;
    });
  }


}
