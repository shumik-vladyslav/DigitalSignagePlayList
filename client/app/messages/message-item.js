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
var checkbox_1 = require('@angular2-material/checkbox');
var input_1 = require('@angular2-material/input');
var message_1 = require('./message');
var MessageItem = (function () {
    function MessageItem() {
    }
    /*@Output () edited = new EventEmitter();*/
    MessageItem.prototype.toggleChangeActive = function () {
        this.message.active = !this.message.active;
    };
    /*edit (message: Message, title: string) {
        this.edited.emit(message, title);
    }*/
    MessageItem.prototype.onMessageDeleted = function (message) {
        console.log("message");
        /*if (message) {
         let index = this.messages.indexOf(message);
         if (index > -1) {
         this.messages.splice(index,1);
         }
         }*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_1.Message)
    ], MessageItem.prototype, "message", void 0);
    MessageItem = __decorate([
        core_1.Component({
            selector: 'md-list-item',
            templateUrl: 'app/messages/message-item.html',
            directives: [checkbox_1.MdCheckbox, input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageItem);
    return MessageItem;
}());
exports.MessageItem = MessageItem;
//# sourceMappingURL=message-item.js.map