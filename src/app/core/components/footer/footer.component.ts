import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    this.currentYear = today.getFullYear();
  }

}
