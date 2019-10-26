import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as md from '../../core/_models';

@Component({
  selector: 'app-contacts-card',
  templateUrl: './contacts-card.component.html',
  styleUrls: ['./contacts-card.component.scss']
})
export class ContactsCardComponent implements OnInit {

  @Input() contact: md.Contact;

  @Output() newFavoriteValue: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  getNewFavoriteFlag(newValue: boolean): void {
    this.newFavoriteValue.emit(newValue);
  }


}
