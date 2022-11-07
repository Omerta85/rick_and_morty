import { NgModule } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatListModule} from "@angular/material/list"
import {MatCardModule} from "@angular/material/card"
import {MatDividerModule} from "@angular/material/divider"
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"
import {MatGridListModule} from "@angular/material/grid-list"


@NgModule({
  exports:[
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
