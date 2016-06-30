import { Component } from '@angular/core';
import { MessagePanel } from './message-panel';
import { MessageList } from './message-list';
import { Message } from './message';


@Component({
    selector: 'cms-app',
    templateUrl: 'app/messages/messages.html',
    styleUrls: ['app/messages/messages.css'],
    directives: [MessagePanel, MessageList]
})
export class MessagesComponent {
    messages: Message [];

    constructor () {
        this.messages = [];
    }

    onMessagesAdded (message: Message) {
        this.messages.push(message);
    }
}
