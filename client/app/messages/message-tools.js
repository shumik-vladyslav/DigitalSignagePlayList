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
var message_model_1 = require('./message-model');
var MessageItem = (function () {
    function MessageItem() {
        this.deleted = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_model_1.Message)
    ], MessageItem.prototype, "message", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MessageItem.prototype, "deleted", void 0);
    MessageItem = __decorate([
        core_1.Component({
            selector: 'message-item',
            templateUrl: 'app/messages/message-item.html',
            styleUrls: ['app/messages/message-item.css'],
            directives: [checkbox_1.MdCheckbox, input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageItem);
    return MessageItem;
}());
exports.MessageItem = MessageItem;
//# sourceMappingURL=message-tools.jss.map