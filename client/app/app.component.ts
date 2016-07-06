import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import './rxjs-operators';

import { MessagesComponent } from './messages/messages';
import { AssetsComponent } from './assets/assets';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [MessagesComponent, AssetsComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class AppComponent {


}