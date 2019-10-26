import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 1,
        firstName: 'Pepito',
        lastName: 'Lopez',
        favorite: false,
      },
      {
        id: 2,
        firstName: 'Fulano',
        lastName: 'Detal',
        favorite: false,
      },
      {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        favorite: true,
      },
      {
        id: 4,
        firstName: 'Alguien',
        lastName: 'Mas',
        favorite: false,
      },
      {
        id: 5,
        firstName: 'Alguien',
        lastName: 'Mas2',
        favorite: false,
      }
    ];
    return {contacts};
  }
}
