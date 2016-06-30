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
var message_list_1 = require('./message-list');
var message_1 = require('./message');
var MessagePanel = (function () {
    function MessagePanel() {
        this.added = new core_1.EventEmitter();
    }
    MessagePanel.prototype.add = function (title) {
        this.added.emit(new message_1.Message(title));
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MessagePanel.prototype, "added", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_1.Message)
    ], MessagePanel.prototype, "message", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MessagePanel.prototype, "messages", void 0);
    MessagePanel = __decorate([
        core_1.Component({
            selector: 'message-panel',
            templateUrl: './message-panel.html',
            styleUrls: ['./message-panel.css'],
            directives: [message_list_1.MessageList]
        }), 
        __metadata('design:paramtypes', [])
    ], MessagePanel);
    return MessagePanel;
}());
exports.MessagePanel = MessagePanel;
//# sourceMappingURL=message-panel.js.map