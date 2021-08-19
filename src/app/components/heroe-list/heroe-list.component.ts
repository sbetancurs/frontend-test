import { Component, OnInit } from '@angular/core';

import { CharacterService } from '@services/character.service';

import { Character } from '@models/character';

@Component({
  selector: 'app-heroe-list',
  templateUrl: './heroe-list.component.html',
  styleUrls: ['./heroe-list.component.scss'],
})
export class HeroeListComponent implements OnInit {
  characters: Character[];

  constructor(private client: CharacterService) {}

  ngOnInit(): void {
    this.client
      .getAll()
      .subscribe((response) => (this.characters = response.data.results));
    console.log(this.characters);
  }
}
