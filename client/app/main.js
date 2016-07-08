"use strict";
/**
 * Created by Vlad on 6/28/2016.
 */
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
//import { Configuration } from './app.constants';
//import { SecurityService } from './services/SecurityService';
//import { APP_ROUTER_PROVIDERS } from './app.routes';
var router_1 = require('@angular/router');
var routes_1 = require('./routes');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_1.provideRouter(routes_1.AppRoutes),
    http_1.HTTP_PROVIDERS
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map