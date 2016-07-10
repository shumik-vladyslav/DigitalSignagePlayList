import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import './rxjs-operators';

import { MessagesMain } from './messages/messages-main';
import { AssetsMain } from './assets/assets-main';

import {TableComponent} from "./table/MyTable";
import {AgentsManager} from "./agents/AgentsManager";
//import {DragulaAppApp} from "./test/DragulaApp";

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

export const AppRoutes = [
    { path: '', redirectTo: '/dashboard/messages', terminal: true },
    { path: 'dashboard/assets', component: AssetsMain },
    { path: 'dashboard/messages', component: MessagesMain, useAsDefault: true},
   // { path: 'dashboard/assets1', component: AssetsComponent },
    { path: 'dashboard/table', component:TableComponent },
    { path: 'dashboard/agents', component:AgentsManager }
   // { path: 'dashboard/dragula', component:DragulaAppApp}
]




