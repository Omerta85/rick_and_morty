import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { DisplayLocationsComponent } from './pages/display-locations/display-locations.component';
import { MaterialModule } from '../../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewLocationComponent } from './pages/view-location/view-location.component';
import { RickAndMortyModule } from '../../rick-and-morty.module';


@NgModule({
  declarations: [
    DisplayLocationsComponent,
    ViewLocationComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    RickAndMortyModule
  ],exports:[
  ]
})
export class LocationsModule { }
