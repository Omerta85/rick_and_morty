import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from '../../../../services/characters.service';
import { CharacterResult, CharacterInfo } from '../../../../../interfaces/character';


@Component({
  selector: 'app-display-characters',
  templateUrl: './display-characters.component.html',
  styleUrls: []
})
export class DisplayCharactersComponent implements OnInit {

  public characters: CharacterResult[] = [];
  public CharactersTemp: CharacterResult[] = [];
  public from: number = 0;
  public currentPage: number = 1;
  public characterInfo?: CharacterInfo;
  public loadingCharacters: boolean = true;


  constructor(private cs: CharactersService) { }

  @ViewChild("searchCharacter") searchtxt?: ElementRef;

  ngOnInit(): void {
    this.loadCharacters(0);
  }

  loadCharacters(nextPage: number) {
    const searchtext: string = this.searchtxt?.nativeElement.value || "";
    if (this.from == 0) {
      if (searchtext.length < 1) {
        this.loadingCharacters = true;
        this.cs.getAllCharacters().subscribe({
          next: (characterResp) => {
            if (characterResp.results) {
              this.characters = characterResp.results;
              this.CharactersTemp = characterResp.results;
              this.characterInfo = characterResp.info;
              this.loadingCharacters = false;
            }
            return;
          }, error: err => {

          }
        });
      } else {
        this.loadingCharacters = true;
        this.cs.getCharactersByName(searchtext).subscribe({
          next:
            characterResp => {
              if (characterResp.results) {
                this.characters = characterResp.results;
                this.CharactersTemp = characterResp.results;
                this.characterInfo = characterResp.info;
                this.loadingCharacters = false;
                return;
              }
            }, error: err => {
              this.characters = [];
              this.CharactersTemp = [];
              this.loadingCharacters = false;
            }
        });
      }
    } else if (nextPage > 0 && this.characterInfo!.next) {
      this.loadPaginatedCharacters(this.characterInfo!.next);
    } else if (nextPage < 0 && this.characterInfo!.prev) {
      this.loadPaginatedCharacters(this.characterInfo!.prev);
    }
  }


  loadPaginatedCharacters(url: string) {
    this.loadingCharacters = true;
    this.cs.getPaginatedCharacters(url).subscribe(
      characterResp => {
        this.characters = characterResp.results;
        this.CharactersTemp = characterResp.results;
        this.characterInfo = characterResp.info;
        this.loadingCharacters = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.characterInfo?.count!) {
      this.from -= value;
    }
    this.loadCharacters(value);
  }

  search() {
    if (this.searchtxt?.nativeElement.value.length === 0) {
      this.characters = this.CharactersTemp;
    }
    this.from = 0;
    this.loadCharacters(0);
    return;
  }


}
