import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import * as md from '../../core/_models';
import { ContactService } from '../services/contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUtil {

  private contactsSource: BehaviorSubject<md.Contact[]> = new BehaviorSubject<md.Contact[]>([]);
  public contacts$: Observable<md.Contact[]> = this.contactsSource.asObservable();

  constructor(
    private contactService: ContactService,
    private spinner: NgxSpinnerService,
  ) { }

  getContacts(): void {
    this.spinner.show();
    this.contactService.getContacts().pipe(
      first()
    ).subscribe(
      contactsList => (
        this.contactsSource.next(contactsList)
      ),
      error => (
        console.log('Error')
      ),
      () => {
        this.spinner.hide();
      }
    );
  }

  updateFavoriteFlag(contactId: number, newValue: boolean): void {
    this.spinner.show();
    this.contacts$.pipe(first()).subscribe( contacts => {
      let contactToUpdate: md.Contact;
      contacts.forEach(contact => {
        if (contact.id === contactId) {
          contactToUpdate = { ...contact};
        }
      });
      contactToUpdate.favorite = newValue;
      this.contactService.updateContact(contactToUpdate).pipe(
        first()
      ).subscribe(
        result => (
          this.getContacts()
        ),
        error => (
          console.log('error!!!')
        )
      );
    });
  }

}
