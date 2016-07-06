import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MessagePanel } from './message-panel';
import { MessageList } from './message-list';
import { Message } from './message-model';


@Component({
    selector: 'messages-app',
    templateUrl: 'app/messages/messages.html',
    styleUrls: ['app/messages/messages.css'],
    directives: [MessagePanel, MessageList, ROUTER_DIRECTIVES]
})
export class MessagesComponent {
    messages: Message [];

    constructor () {
        this.messages = [];
    }

    onMessagesAdded (message: Message) {
        this.messages.push(message);
    }

   /* onMessageDeleted () {
        console.log("message");
        /!*if (message) {
         let index = this.messages.indexOf(message);
         if (index > -1) {
         this.messages.splice(index,1);
         }
         }*!/
    }*/
}
