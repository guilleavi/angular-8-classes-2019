import { Component, OnInit } from '@angular/core';
import * as md from '../../core/_models';
import * as mk from '../../core/_mocks';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  contacts: md.Contact[];

  constructor() { }

  ngOnInit() {
    this.contacts = mk.ContactsMock;
  }

  updateFavoriteFlag(newValue: boolean, contactId: number): void {
    console.log(`Set to ${newValue} the contact ${contactId}`);
  }

}
