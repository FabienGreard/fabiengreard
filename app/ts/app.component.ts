import { Component } from '@angular/core';

import '../css/app.css';

@Component({
  moduleId: 'module.id',
  selector: 'app',
  template: require('../html/app.component.html')
})
export class AppComponent {
  year: number;
  version: string;
  constructor(){
    this.year = new Date().getFullYear();
    this.version = 'v1.0.0'
  }
}
