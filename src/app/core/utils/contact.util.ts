import { Injectable } from '@angular/core';
import { ContactService } from '../services/contact.service';
import * as md from '../../core/_models';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUtil {

  private contactsSource: BehaviorSubject<md.Contact[]> = new BehaviorSubject<md.Contact[]>([]);
  public contacts$: Observable<md.Contact[]> = this.contactsSource.asObservable();

  constructor(
    private contactService: ContactService
  ) {  }

  getContacts(): void {
    this.contactService.getContacts().pipe(
      first()
    ).subscribe(
      contactsList => (
        this.contactsSource.next(contactsList)
      ),
      error => (
        console.log('Error')
      )
    );
  }

}
