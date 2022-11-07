import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RickAndMortyRoutingModule } from './rick-and-morty-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { EpisodesCardComponent } from './components/episodes-card/episodes-card.component';
import { LocationsCardComponent } from './components/locations-card/locations-card.component';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    CharacterCardComponent,
    EpisodesCardComponent,
    LocationsCardComponent
   ],
  imports: [
    CommonModule,
    RickAndMortyRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ], exports:[
    CharacterCardComponent,
    EpisodesCardComponent,
    LocationsCardComponent
  ]
})
export class RickAndMortyModule { }
