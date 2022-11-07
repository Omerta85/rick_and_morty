import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { LocationResult, LocationInfo } from '../../../../../interfaces/location';
import { LocationsService } from '../../../../services/locations.service';

@Component({
  selector: 'app-display-locations',
  templateUrl: './display-locations.component.html',
  styleUrls: []
})
export class DisplayLocationsComponent implements OnInit {

  public locations: LocationResult[] = [];
  public locationsTemp: LocationResult[] = [];
  public from: number = 0;
  public currentPage: number = 1;
  public locationsInfo?: LocationInfo;
  public loadingLocations: boolean = true;

  constructor(private ls: LocationsService) { }

  @ViewChild("searchLocation") searchtxt?: ElementRef;

  ngOnInit(): void {
    this.loadLocations(0);
  }
  loadLocations(nextPage: number) {
    const searchtext: string = this.searchtxt?.nativeElement.value || "";
    if (this.from == 0) {
      if (searchtext.length < 1) {
        this.loadingLocations = true;
        this.ls.getAllLocations().subscribe({
          next: (locationResp) => {
            if (locationResp.results) {
              this.locations = locationResp.results;
              this.locationsTemp = locationResp.results;
              this.locationsInfo = locationResp.info;
              this.loadingLocations = false;
            }
            return;
          }, error: err => {

          }
        });
      } else {
        this.loadingLocations = true;
        this.ls.getLocationsByName(searchtext).subscribe({
          next:
            (locationResp) => {
              if (locationResp.results) {
                this.locations = locationResp.results;
                this.locationsTemp = locationResp.results;
                this.locationsInfo = locationResp.info;
                this.loadingLocations = false;
                return;
              }
            }, error: err => {
              this.locations = [];
              this.locationsTemp = [];
              this.loadingLocations = false;
            }
        });
      }
    } else if (nextPage > 0 && this.locationsInfo!.next) {
      this.loadPaginatedLocations(this.locationsInfo!.next);
    } else if (nextPage < 0 && this.locationsInfo!.prev) {
      this.loadPaginatedLocations(this.locationsInfo!.prev);
    }
  }
  //función para cargar en base a la paginación
  loadPaginatedLocations(url: string) {
    this.loadingLocations = true;
    this.ls.getPaginatedLocations(url).subscribe(
      locationResp => {
        this.locations = locationResp.results;
        this.locationsTemp = locationResp.results;
        this.locationsInfo = locationResp.info;
        this.loadingLocations = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.locationsInfo?.count!) {
      this.from -= value;
    }
    this.loadLocations(value);
  }

  search() {
    if (this.searchtxt?.nativeElement.value.length === 0) {
      this.locations = this.locationsTemp;
    }
    this.from = 0;
    this.loadLocations(0);
    return;
  }

}
