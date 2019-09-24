import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template:`
    <app-navigation></app-navigation>
    <div class="container">
    <div class="row">
    <div class="col"></div>
    <div class="col-8"><router-outlet></router-outlet></div>
    <div class="col"></div>
    </div>
    </div>
    `
})
export class AppComponent {
  constructor(private route:Router){}
  ngOnInit(){
  }
}
