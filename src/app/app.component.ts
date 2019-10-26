import { Component, OnInit } from '@angular/core';
// import { ObservableSamplesUtil } from './core/utils/observable-samples.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-classes';

  constructor(
    // private observableSamplesUtil: ObservableSamplesUtil
  ) {
  }

  ngOnInit(): void {
    // this.observableSamplesUtil.triggerMethod();
  }
}
