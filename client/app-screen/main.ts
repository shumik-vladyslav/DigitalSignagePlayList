/**
 * Created by Vlad on 6/28/2016.
 */
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import './rxjs-operators';
import { provideRouter, RouterConfig } from '@angular/router';
import { MessagesMain } from '../app/messages/messages-main';
import { AssetsMain } from '../app/assets/assets-main';


export const routes: RouterConfig = [
    { path: '', component: MessagesMain },
    { path: 'assets', component: AssetsMain },
    /*{ path: 'assets/upload', component:UploadFiles},
     { path: 'files/upload', component:UploadFiles},*!/*/
    { path: 'messages', component: MessagesMain},
    /*    { path: 'table', component:TableComponent },
     { path: 'agents', component:AgentsManager },
     { path: '**', redirectTo: '/dashboard/messages' }*/
]


export const screenRouterProviders = [
    provideRouter(routes)
];


@Component({
    selector: 'my-screen',
    template: `   
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class ScreenComponent {


}


bootstrap(ScreenComponent, [
    screenRouterProviders,
    HTTP_PROVIDERS
]).catch(err => console.error(err));
