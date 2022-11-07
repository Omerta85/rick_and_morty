import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EpisodesService } from 'src/app/rick-and-morty/services/episodes.service';
import { EpisodesResult, EpisodesInfo } from '../../../../../interfaces/episodes';

@Component({
  selector: 'app-display-episodes',
  templateUrl: './display-episodes.component.html',
  styleUrls: []
})
export class DisplayEpisodesComponent implements OnInit {

  public episodes: EpisodesResult[] = [];
  public episodesTemp: EpisodesResult[] = [];
  public from: number = 0;
  public currentPage: number = 1;
  public episodesInfo?: EpisodesInfo;
  public loadingEpisodes: boolean = true;

  constructor(private es: EpisodesService) { }

  @ViewChild("searchEpisode") searchtxt?: ElementRef;

  ngOnInit(): void {
    this.loadEpisodes(0);
  }
  loadEpisodes(nextPage: number) {
    const searchtext: string = this.searchtxt?.nativeElement.value || "";
    if (this.from == 0) {
      if (searchtext.length < 1) {
        this.loadingEpisodes = true;
        this.es.getAllEpisodes().subscribe({
          next: (episodeResp) => {
            if (episodeResp.results) {
              this.episodes = episodeResp.results;
              this.episodesTemp = episodeResp.results;
              this.episodesInfo = episodeResp.info;
              this.loadingEpisodes = false;
            }
            return;
          }, error: err => {

          }
        });
      } else {
        this.loadingEpisodes = true;
        this.es.getEpisodesByName(searchtext).subscribe({
          next:
            (episodeResp) => {
              if (episodeResp.results) {
                this.episodes = episodeResp.results;
                this.episodesTemp = episodeResp.results;
                this.episodesInfo = episodeResp.info;
                this.loadingEpisodes = false;
                return;
              }
            }, error: err => {
              this.episodes = [];
              this.episodesTemp = [];
              this.loadingEpisodes = false;
            }
        });
      }
    } else if (nextPage > 0 && this.episodesInfo!.next) {
      this.loadPaginatedEpisodes(this.episodesInfo!.next);
    } else if (nextPage < 0 && this.episodesInfo!.prev) {
      this.loadPaginatedEpisodes(this.episodesInfo!.prev);
    }
  }

  loadPaginatedEpisodes(url: string) {
    this.loadingEpisodes = true;
    this.es.getPaginatedEpisodes(url).subscribe(
      episodeResp => {
        this.episodes = episodeResp.results;
        this.episodesTemp = episodeResp.results;
        this.episodesInfo = episodeResp.info;
        this.loadingEpisodes = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.episodesInfo?.count!) {
      this.from -= value;
    }
    this.loadEpisodes(value);
  }

  search() {
    if (this.searchtxt?.nativeElement.value.length === 0) {
      this.episodes = this.episodesTemp;
    }
    this.from = 0;
    this.loadEpisodes(0);
    return;
  }

}
