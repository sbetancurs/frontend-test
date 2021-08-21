import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '@models/character';
@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.scss'],
})
export class HeroeCardComponent implements OnInit {
  @Input() character: Character;
  @Output() openModalEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  openModal(value: string) {
    // this method emits the value of newItemEvent
    this.openModalEvent.emit(value);
  }
}
