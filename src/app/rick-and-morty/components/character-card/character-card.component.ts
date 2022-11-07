import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterResult } from 'src/app/interfaces/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: []
})
export class CharacterCardComponent implements OnInit {

  @Input("Character") character!:CharacterResult;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToCharacter(id:number){
    this.router.navigateByUrl(`/characters/${id}`);
  }

  goToLocation(charLocation: string) {
    const id = charLocation.slice(41);
    console.log(charLocation, " + ", id);
    if (id) {
      this.router.navigateByUrl(`/locations/${id}`);
    }
  }
}
