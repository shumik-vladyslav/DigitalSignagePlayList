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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
require('./rxjs-operators');
var messages_main_1 = require('./messages/messages-main');
var assets_1 = require('./assets/assets');
var DataTableBasicUsageComponent_1 = require("./test/DataTableBasicUsageComponent");
var MyTable_1 = require("./table/MyTable");
var AgentsManager_1 = require("./agents/AgentsManager");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1 class=\"title\">Dashboard</h1>\n    <nav>\n      <a [routerLink]=\"['/dashboard/messages']\" class=\"btn\"><span class=\"fa fa-messages\"></span> Messages Marquee</a>\n      <a [routerLink]=\"['/dashboard/table']\" class=\"btn\"><span class=\"fa fa-calculator\"></span> Table</a>\n      <a [routerLink]=\"['/dashboard/assets']\" class=\"btn\"><span class=\"fa fa-picture-o\"></span> Assets</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
exports.AppRoutes = [
    { path: '', redirectTo: '/dashboard/messages', terminal: true },
    { path: 'dashboard/messages', component: messages_main_1.MessagesMain, useAsDefault: true },
    { path: 'dashboard/assets', component: assets_1.AssetsComponent },
    { path: 'dashboard/table', component: MyTable_1.TableComponent },
    { path: 'dashboard/agents', component: AgentsManager_1.AgentsManager },
    { path: 'dashboard', component: DataTableBasicUsageComponent_1.DataTableBasicUsageComponent }
];
//# sourceMappingURL=app.component.js.map