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
/*import { MessageItem } from './message-item';*/
var message_model_1 = require('./message-model');
var MessageList = (function () {
    function MessageList() {
    }
    MessageList.prototype.toggleChangeActive = function () {
        console.log("toggle");
        this.message.active = !this.message.active;
    };
    MessageList.prototype.inputChange = function (title) {
        console.log("input");
        this.message.title = title;
    };
    /*del () {
    console.log("delete")
    this.deleted.emit(this.message);
    }*!/*/
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
        __metadata('design:type', message_model_1.Message)
    ], MessageList.prototype, "message", void 0);
    MessageList = __decorate([
        core_1.Component({
            selector: 'md-data-table',
            template: "\n                <thead>\n                <tr>\n                    <th class=\"md-text-cell\">Active</th>\n                    <th class=\"md-text-cell\">Content</th>\n                </tr>\n                </thead>\n                <tbody *ngIf=\"messages.length > 0\">\n                    <tr *ngFor=\"let message of messages\" (deleted)=\"onMessageDeleted($event)\">\n                        <td class=\"md-text-cell\">\n                            <md-checkbox (change)=\"toggleChangeActive()\"></md-checkbox>\n                        </td>\n                        <td class=\"md-text-cell\">\n                    <md-input #titleInput (change)=\"inputChange(titleInput.value)\">{{ message.title }}</md-input>\n                    </td>\n                </tr>\n                </tbody>\n                ",
            directives: [checkbox_1.MdCheckbox, input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageList);
    return MessageList;
}());
exports.MessageList = MessageList;
//# sourceMappingURL=message-list.js.map