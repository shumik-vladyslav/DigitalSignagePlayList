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
/**
 * Created by Vlad on 6/28/2016.
 */
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
require('./rxjs-operators');
var router_2 = require('@angular/router');
var messages_main_1 = require('../app/messages/messages-main');
var assets_main_1 = require('../app/assets/assets-main');
exports.routes = [
    { path: '', component: messages_main_1.MessagesMain },
    { path: 'assets', component: assets_main_1.AssetsMain },
    /*{ path: 'assets/upload', component:UploadFiles},
     { path: 'files/upload', component:UploadFiles},*!/*/
    { path: 'messages', component: messages_main_1.MessagesMain },
];
exports.screenRouterProviders = [
    router_2.provideRouter(exports.routes)
];
var ScreenComponent = (function () {
    function ScreenComponent() {
    }
    ScreenComponent = __decorate([
        core_1.Component({
            selector: 'my-screen',
            template: "   \n    <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ScreenComponent);
    return ScreenComponent;
}());
exports.ScreenComponent = ScreenComponent;
platform_browser_dynamic_1.bootstrap(ScreenComponent, [
    exports.screenRouterProviders,
    http_1.HTTP_PROVIDERS
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map