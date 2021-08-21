import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '@models/character';
@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  @Output() openModalEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  openModal(value: string) {
    // this method emits the value of newItemEvent
    this.openModalEvent.emit(value);
  }
}
