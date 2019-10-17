import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as md from '../../core/_models';
import * as mk from '../../core/_mocks';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  getContacts(): Observable<md.Contact[]> {
    return of(mk.ContactsMock);
  }
}
