import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayCharactersComponent } from './pages/display-characters/display-characters.component';
import { ViewCharacterComponent } from './pages/view-character/view-character.component';

const routes: Routes = [
  {path: "", component: DisplayCharactersComponent},
  {path: ":id", component: ViewCharacterComponent},
  {path: "**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
