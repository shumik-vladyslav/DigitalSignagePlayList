import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


import { MessageService} from './message-service';
import { MessageTools } from './message-tools';
import { MessageList } from './message-list';
import { Message } from './message-model';


@Component({
    selector: 'div',
    template: `<div class ="panel panel-default">
               <div class="panel-heading">
               <message-tools (added)="onMessagesAdded($event)"></message-tools>
               </div>
               <div class="panel-body">
               <message-list [messages]="messages"></message-list>
               </div>
               </div>`,
    styleUrls: ['app/messages/messages.css'],
    directives: [MessageTools, MessageList, ROUTER_DIRECTIVES],
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
        this.getMessages();
    }

    getMessages() {
        this.messageService.getMessages()
            .subscribe(
                messages => this.messages = messages,
                error =>  this.errorMessage = <any>error);{
        }
    }

    saveMessage (name: string) {
        console.log(name);
        if (!name) { return; }
        this.messageService.addMessage(name)
            .subscribe(
                message  => this.messages.push(message),
                error =>  this.errorMessage = <any>error);
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