import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {path:"", component: MainComponent, children:[
    {path: "", component: DashboardComponent},
    {path: "characters", loadChildren: () => import("./modules/characters/characters.module").then(m => m.CharactersModule)},
    {path: "locations", loadChildren: () => import("./modules/locations/locations.module").then(m => m.LocationsModule)},
    {path: "episodes", loadChildren: () => import("./modules/episodes/episodes.module").then(m => m.EpisodesModule)},
    {path: "**", redirectTo:""}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RickAndMortyRoutingModule { }
