"use strict";
/**
 * Created by Vlad on 6/28/2016.
 */
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var routes_1 = require('./routes');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_1.provideRouter(routes_1.AppRoutes), core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' })]);
//# sourceMappingURL=main.js.map