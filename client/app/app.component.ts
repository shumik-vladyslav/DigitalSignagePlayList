import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MessagesComponent } from './messages/messages';
import { AssetsComponent } from './assets/assets';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [MessagesComponent, AssetsComponent, ROUTER_DIRECTIVES],
})

export class AppComponent {


}