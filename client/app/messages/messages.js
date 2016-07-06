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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var message_service_1 = require('./message-service');
var message_panel_1 = require('./message-panel');
var message_list_1 = require('./message-list');
var MessagesComponent = (function () {
    function MessagesComponent(messageService) {
        this.messageService = messageService;
        this.mode = 'Observable';
        this.messages = [];
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this.messages = this.getMessages();
        console.log(this.messages);
    };
    MessagesComponent.prototype.getMessages = function () {
        var _this = this;
        this.messageService.getMessages()
            .subscribe(function (messages) { return _this.messages = messages; }, function (error) { return _this.errorMessage = error; });
    };
    MessagesComponent.prototype.addMessage = function (name) {
        var _this = this;
        if (!name) {
            return;
        }
        this.messageService.addMessage(name)
            .subscribe(function (message) { return _this.messages.push(message); }, function (error) { return _this.errorMessage = error; });
    };
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'messages-app',
            templateUrl: 'app/messages/messages.html',
            styleUrls: ['app/messages/messages.css'],
            directives: [message_panel_1.MessagePanel, message_list_1.MessageList, router_1.ROUTER_DIRECTIVES],
            providers: [message_service_1.MessageService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.js.map