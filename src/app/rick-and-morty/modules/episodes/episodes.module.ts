import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { DisplayEpisodesComponent } from './pages/display-episodes/display-episodes.component';
import { MaterialModule } from '../../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ViewEpisodeComponent } from './pages/view-episode/view-episode.component';
import { RickAndMortyModule } from '../../rick-and-morty.module';


@NgModule({
  declarations: [DisplayEpisodesComponent , ViewEpisodeComponent],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    RickAndMortyModule
  ]
})
export class EpisodesModule { }
