import { Component, OnInit, OnDestroy } from '@angular/core';
import * as md from '../../core/_models';
import * as mk from '../../core/_mocks';
import { ContactUtil } from 'src/app/core/utils/contact.util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {

  private mySubscription = new Subscription();

  contacts: md.Contact[];

  // contacts$: Observable<md.Contact[]>;

  constructor(
    private contactUtil: ContactUtil,
  ) { }

  ngOnInit() {
    // this.contacts$ = this.contactUtil.contacts$;
    this.mySubscription.add(this.contactUtil.contacts$.subscribe(
        result => {
          this.contacts = result; // TODO: move to async pipe
        },
        error => {
          console.log('Error!');
        }
    ));
    this.contactUtil.getContacts();
  }

  updateFavoriteFlag(newValue: boolean, contactId: number): void {
    console.log(`Set to ${newValue} the contact ${contactId}`);
    this.contactUtil.updateFavoriteFlag(contactId, newValue);
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
