"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var app_component_2 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_2.AppComponent, [
    router_1.provideRouter(app_component_1.AppRoutes),
    http_1.HTTP_PROVIDERS
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map