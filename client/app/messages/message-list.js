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
var list_1 = require('@angular2-material/list');
var message_item_1 = require('./message-item');
var message_1 = require('./message');
var MessageList = (function () {
    function MessageList() {
    }
    MessageList.prototype.onMessageDeleted = function (message) {
        if (message) {
            var index = this.messages.indexOf(message);
            if (index > -1) {
                this.messages.splice(index, 1);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MessageList.prototype, "messages", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_1.Message)
    ], MessageList.prototype, "message", void 0);
    MessageList = __decorate([
        core_1.Component({
            selector: 'message-list',
            templateUrl: 'app/messages/message-list.html',
            directives: [message_item_1.MessageItem, list_1.MdList]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageList);
    return MessageList;
}());
exports.MessageList = MessageList;
//# sourceMappingURL=message-list.js.map