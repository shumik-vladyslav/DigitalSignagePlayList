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
var message_panel_1 = require('./message-panel');
var message_list_1 = require('./message-list');
var Messages = (function () {
    function Messages() {
        this.messages = [];
    }
    Messages.prototype.onMessagesAdded = function (message) {
        this.messages.push(message);
    };
    Messages = __decorate([
        core_1.Component({
            selector: 'cms-app',
            templateUrl: './app.html',
            styleUrls: ['./css/app.css'],
            directives: [message_panel_1.MessagePanel, message_list_1.MessageList]
        }), 
        __metadata('design:paramtypes', [])
    ], Messages);
    return Messages;
}());
exports.Messages = Messages;
//# sourceMappingURL=app.js.map