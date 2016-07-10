"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const message_service_1 = require('../services/message-service');
const message_tools_1 = require('./message-tools');
const message_list_1 = require('./message-list');
let MessagesMain = class MessagesMain {
    constructor(messageService) {
        this.messageService = messageService;
        this.mode = 'Observable';
        this.messages = [];
    }
    ngOnInit() {
        this.getMessages();
    }
    getMessages() {
        this.messageService.getMessages()
            .subscribe(messages => this.messages = messages, error => this.errorMessage = error);
        {
        }
    }
    saveMessages() {
        this.messageService.saveMessages(this.messages)
            .subscribe((res) => {
            console.log(res);
        }, error => this.errorMessage = error);
    }
    onMessageAdded(message) {
        this.messages.push(message);
    }
    onMessageDeleted() {
        let item;
        this.messages.forEach(function (message) {
            if (message.selected === true)
                item = message;
        });
        if (item) {
            let index = this.messages.indexOf(item);
            if (index > -1) {
                this.messages.splice(index, 1);
            }
        }
    }
};
MessagesMain = __decorate([
    core_1.Component({
        selector: 'div',
        template: `<div class ="panel panel-default">
               <div class="panel-heading">
               <message-tools (added)="onMessageAdded($event)" (deleted)="onMessageDeleted()" (saved)="saveMessages()"></message-tools>
               </div>
               <div class="panel-body">
               <message-list [messages]="messages"></message-list>
               </div>
               </div>`,
        styleUrls: ['app/messages/messages-main.css'],
        directives: [message_tools_1.MessageTools, message_list_1.MessageList, router_1.ROUTER_DIRECTIVES],
        providers: [message_service_1.MessageService]
    }), 
    __metadata('design:paramtypes', [message_service_1.MessageService])
], MessagesMain);
exports.MessagesMain = MessagesMain;
//# sourceMappingURL=messages-main.js.map