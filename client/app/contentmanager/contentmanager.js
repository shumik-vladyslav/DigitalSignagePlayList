/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
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
var ContentManager = (function () {
    function ContentManager() {
    }
    ContentManager = __decorate([
        core_1.Component({
            selector: 'content-manager',
            template: "\n        <h1>Content-manager</h1>\n        <nav>\n            <a [routerLink]=\"['/dashboard/content-manager/files']\" class=\"btn\"><span class=\"fa fa-messages\"></span> Add</a>\n        </nav>\n        <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ContentManager);
    return ContentManager;
}());
exports.ContentManager = ContentManager;
//# sourceMappingURL=contentmanager.js.map