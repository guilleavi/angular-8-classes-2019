import { NgModule } from '@angular/core';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsCardComponent } from './contacts-card/contacts-card.component';


@NgModule({
  declarations: [
    ContactsListComponent,
    ContactsCardComponent
  ],
  imports: [
    ContactsRoutingModule,
    SharedModule,
  ],
  exports: [
    ContactsListComponent
  ]
})
export class ContactsModule { }
