import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import * as md from '../../core/_models';
import * as mk from '../../core/_mocks';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, catchError, first } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getContacts(): Observable<md.Contact[]> {
    const url = 'api/contacts';
    return this.http.get<md.Contact[]>(
      url
    ).pipe(
      first(),
      tap( _ => console.log('Get Contacts')),
      catchError(err => {
        this.messageService.add(`Get Contacts failed: ${err.status} - ${err.statusText}`);
        return of([]);
      })
    );
  }

  getContactById(id: number): Observable<md.Contact> {
    const url = `api/contacts/${id}`;
    return this.http.get<md.Contact>(
      url
    ).pipe(
      first(),
      tap( _ => console.log('Get Contact By ID')),
      catchError(err => {
        this.messageService.add(`Get Contact By ID failed: ${err.status} - ${err.statusText}`);
        return of({} as md.Contact);
      })
    );
  }

  getContactByName(firstName: string): Observable<md.Contact[]> {
    const url = `api/contacts/`; // ?firstName=${firstName}`;
    let httpParams = new HttpParams();
    httpParams = httpParams.set('firstName', firstName);

    const httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json'
    });

    return this.http.get<md.Contact[]>(
      url,
      {
        params: httpParams,
        headers: httpHeaders
      }
    ).pipe(
      first(),
      tap( _ => console.log('Get Contact By FirstName')),
      catchError(err => {
        this.messageService.add(`Get Contact By FirstName failed: ${err.status} - ${err.statusText}`);
        return of([]);
      })
    );
  }

  addContact(contact: md.Contact): Observable<md.Contact> {
    const url = 'api/contacts';
    return this.http.put<md.Contact>(
      url,
      contact
    ).pipe(
      first(),
      tap( _ => console.log('Add Contact')),
      catchError(err => {
        this.messageService.add(`Add Contact failed: ${err.status} - ${err.statusText}`);
        return of({} as md.Contact);
      })
    );
  }

  updateContact(contact: md.Contact): Observable<md.Contact> {
    const url = 'api/contacts';
    return this.http.put<md.Contact>(
      url,
      contact
    ).pipe(
      first(),
      tap( _ => console.log('Update Contact')),
      catchError(err => {
        this.messageService.add(`Update Contact failed: ${err.status} - ${err.statusText}`);
        // return throwError(err);
        return of({} as md.Contact);
      })
    );
  }

  deleteContact(id: number): Observable<md.Contact> {
    const url = `api/contacts/${id}`;
    return this.http.delete<md.Contact>(
      url
    ).pipe(
      first(),
      tap( _ => console.log('Delete Contact')),
      catchError(err => {
        this.messageService.add(`Delete Contact failed: ${err.status} - ${err.statusText}`);
        return of({} as md.Contact);
      })
    );
  }
}
