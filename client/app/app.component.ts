import {Component} from '@angular/core';
import { MessagesComponent} from './messages/messages';

@Component({
    selector: 'my-app',
    template: '<cms-app></cms-app>',
    directives: [MessagesComponent]
})

export class AppComponent {


}