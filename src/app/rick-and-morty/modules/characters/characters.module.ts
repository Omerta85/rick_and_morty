import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { DisplayCharactersComponent } from './pages/display-characters/display-characters.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewCharacterComponent } from './pages/view-character/view-character.component';
import { RickAndMortyModule } from '../../rick-and-morty.module';



@NgModule({
  declarations: [DisplayCharactersComponent,  ViewCharacterComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    RickAndMortyModule
  ]
})
export class CharactersModule { }
