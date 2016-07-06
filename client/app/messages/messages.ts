import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


import { MessageService} from './message-service';
import { MessagePanel } from './message-panel';
import { MessageList } from './message-list';
import { Message } from './message-model';


@Component({
    selector: 'messages-app',
    templateUrl: 'app/messages/messages.html',
    styleUrls: ['app/messages/messages.css'],
    directives: [MessagePanel, MessageList, ROUTER_DIRECTIVES],
    providers: [MessageService]
})
export class MessagesComponent implements OnInit {
    errorMessage: string;
    messages: Message[];
    mode = 'Observable';

    constructor (
        private messageService: MessageService
                )
    {
        this.messages =[];
    }

    ngOnInit () {
        this.messages = this.getMessages();
        console.log(this.messages)
    }

    getMessages(): any {
        this.messageService.getMessages()
            .subscribe(
                messages => this.messages = messages,
                error =>  this.errorMessage = <any>error);
    }

    addMessage (name: string) {
        if (!name) { return; }
        this.messageService.addMessage(name)
            .subscribe(
                message  => this.messages.push(message),
                error =>  this.errorMessage = <any>error);
    }

   /* onMessagesAdded (message: Message) {
      this.messages.push(message);
     }*/

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