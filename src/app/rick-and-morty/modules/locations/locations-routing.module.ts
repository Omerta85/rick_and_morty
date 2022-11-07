import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayLocationsComponent } from './pages/display-locations/display-locations.component';
import { ViewLocationComponent } from './pages/view-location/view-location.component';

const routes: Routes = [
  {path: "", component: DisplayLocationsComponent},
  {path: ":id", component: ViewLocationComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
