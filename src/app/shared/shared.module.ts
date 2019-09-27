import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';



@NgModule({
  declarations: [
    SlideToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SlideToggleComponent
  ]
})
export class SharedModule { }
