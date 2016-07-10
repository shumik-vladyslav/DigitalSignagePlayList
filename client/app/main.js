"use strict";
/**
 * Created by Vlad on 6/28/2016.
 */
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
//import { Configuration } from './app.constants';
//import { SecurityService } from './services/SecurityService';
//import { APP_ROUTER_PROVIDERS } from './app.routes';
const router_1 = require('@angular/router');
const app_component_1 = require('./app.component');
const app_component_2 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_2.AppComponent, [
    router_1.provideRouter(app_component_1.AppRoutes),
    http_1.HTTP_PROVIDERS
]).catch(err => console.error(err));
//# sourceMappingURL=main.js.map