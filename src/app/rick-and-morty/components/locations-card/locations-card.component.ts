import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationResult } from 'src/app/interfaces/location';

@Component({
  selector: 'app-locations-card',
  templateUrl: './locations-card.component.html',
  styleUrls: []
})
export class LocationsCardComponent implements OnInit {

  @Input("Location") location!:LocationResult;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToLocation(charLocation: string) {
    const id = charLocation.slice(41);
    console.log(charLocation, " + ", id);
    if (id) {
      this.router.navigateByUrl(`/locations/${id}`);
    }
  }
}
