import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
    <h1 class="title">Dashboard</h1>
    <nav>
      <a [routerLink]="['/dashboard/messages']" class="btn"><span class="fa fa-messages"></span> Messages Marquee</a>
      <a [routerLink]="['/dashboard/table']" class="btn"><span class="fa fa-calculator"></span> Table</a>
      <a [routerLink]="['/dashboard/assets']" class="btn"><span class="fa fa-picture-o"></span> Assets</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
})

export class AppComponent {


}




