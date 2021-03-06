"use strict";
/**
 * Created by Vlad on 6/28/2016.
 */
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.appRouterProviders,
    http_1.HTTP_PROVIDERS
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map