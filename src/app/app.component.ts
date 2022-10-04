import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'front-end';

  constructor(titulo: Title){
    titulo.setTitle("Início e-Agenda")
  }


}
