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
var index_1 = require("./player-lite/index");
var DefaultController_1 = require("./DefaultController");
var UtilsServices_1 = require("./services/UtilsServices");
//import {RouteParams} from "@angular/router-deprecated";
//import {RouteParams} from "@angular/router-deprecated";
exports.routes = [
    { path: '', component: DefaultController_1.DefaultController },
];
exports.screenRouterProviders = [
    router_2.provideRouter(exports.routes)
];
var ScreenComponent = (function () {
    function ScreenComponent(utils, http) {
        this.utils = utils;
        this.http = http;
    }
    ScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        var params = this.utils.getUrlParams(window.location.href);
        this.screenid = params.screenid;
        index_1.PlayerVO.screenid = this.screenid;
        this.http.get('serverdata/screen_' + this.screenid + '.json').map(function (res) {
            var out = [];
            res.json().data.forEach(function (item) { out.push(new index_1.PlayerVO(item)); });
            return out;
        }).subscribe(function (data) { return _this.players = data; }, function (error) { return console.log(error); }, function () { return console.log('Done'); });
        console.log(params);
    };
    ScreenComponent = __decorate([
        core_1.Component({
            selector: 'my-screen',
            template: "   \n     <player-lite *ngFor=\"let player of players\"  [playervo]=\"player\"  ></player-lite>\n    <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES, index_1.PlayerLite],
            providers: [UtilsServices_1.UtilsServices]
        }), 
        __metadata('design:paramtypes', [UtilsServices_1.UtilsServices, http_1.Http])
    ], ScreenComponent);
    return ScreenComponent;
}());
exports.ScreenComponent = ScreenComponent;
platform_browser_dynamic_1.bootstrap(ScreenComponent, [
    exports.screenRouterProviders,
    http_1.HTTP_PROVIDERS
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map