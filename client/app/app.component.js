"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
require('./rxjs-operators');
const messages_main_1 = require('./messages/messages-main');
const assets_main_1 = require('./assets/assets-main');
const MyTable_1 = require("./table/MyTable");
const AgentsManager_1 = require("./agents/AgentsManager");
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    core_1.Component({
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
        directives: [router_1.ROUTER_DIRECTIVES],
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
exports.AppRoutes = [
    { path: '', redirectTo: '/dashboard/messages', terminal: true },
    { path: 'dashboard/assets', component: assets_main_1.AssetsMain },
    { path: 'dashboard/messages', component: messages_main_1.MessagesMain, useAsDefault: true },
    // { path: 'dashboard/assets1', component: AssetsComponent },
    { path: 'dashboard/table', component: MyTable_1.TableComponent },
    { path: 'dashboard/agents', component: AgentsManager_1.AgentsManager }
];
//# sourceMappingURL=app.component.js.map