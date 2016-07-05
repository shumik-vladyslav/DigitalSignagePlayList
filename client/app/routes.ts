/**
 * Created by Dmitriy Prilutsky on 01.07.2016.
 */


import { provideRouter, RouterConfig } from '@angular/router';

import { MessagesRoutes } from './messages/index';
import { AssetsRoutes } from './assets/index';

const routes: RouterConfig = [
    ...MessagesRoutes,
    ...AssetsRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
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
