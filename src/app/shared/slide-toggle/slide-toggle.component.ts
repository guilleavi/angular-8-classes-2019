import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {

  @Input() label = '';
  @Input() index = 0;
  @Input() checkedValue = false;

  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onToggleChanged(toggle: any): void {
    this.toggleChange.emit(toggle.checked);
  }

}
