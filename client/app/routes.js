/**
 * Created by Dmitriy Prilutsky on 01.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./messages/index');
var index_2 = require('./assets/index');
var routes = index_1.MessagesRoutes.concat(index_2.AssetsRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
];
/*
import { MessagesComponent } from './messages/messages';
import { AssetsComponent } from './assets/assets';

export const AppRoutes = [
    { path: '', redirectTo: '/dashboard', terminal: true },
    { path: 'dashboard/messages', component: MessagesComponent},
    { path: 'dashboard/assets', component: AssetsComponent },
    { path: 'dashboard', component: MessagesComponent }
]*/
//# sourceMappingURL=routes.js.map