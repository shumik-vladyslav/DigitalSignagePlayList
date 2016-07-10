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
const checkbox_1 = require('@angular2-material/checkbox');
let MessageList = class MessageList {
    toggleEditable(message) {
        this.message = message;
        this.messages.forEach(function (message) {
            message.editable = false;
        });
        this.message.editable = !this.message.editable;
    }
    toggleChangeActive(message) {
        this.message = message;
        this.message.active = !this.message.active;
        console.log(message);
    }
    inputChange(message, event) {
        this.message = message;
        this.message.title = event.target.outerText;
    }
    onSelected(message) {
        this.message = message;
        this.messages.forEach(function (message) {
            message.selected = false;
        });
        this.message.selected = !this.message.selected;
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], MessageList.prototype, "messages", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], MessageList.prototype, "message", void 0);
MessageList = __decorate([
    core_1.Component({
        selector: 'message-list',
        template: `<md-data-table>
                <thead>
                <tr>
                    <th class="md-text-cell">Active</th>
                    <th class="md-text-cell">Content</th>
                </tr>
                </thead>
                <tbody *ngIf="messages.length > 0">
                    <tr *ngFor="let message of messages" [ngClass]="{'selected': message.selected, 'editable': message.editable}" (click)="onSelected(message)">
                        <td class="md-text-cell">
                            <md-checkbox (change)="toggleChangeActive(message)" [checked]="message.active"></md-checkbox>
                        </td>
                        <td class="md-text-cell" attr.contenteditable = "{{ message.editable }}" (input)="inputChange(message, $event)" (click)="toggleEditable(message)">
                            {{ message.body}}
                        </td>
                </tr>
                </tbody>
                </md-data-table>
                `,
        styles: [`
    .selected {
    background-color: khaki;
    }
    .selected{
        background-color: #fbfff0;
    }`],
        directives: [checkbox_1.MdCheckbox]
    }), 
    __metadata('design:paramtypes', [])
], MessageList);
exports.MessageList = MessageList;
//# sourceMappingURL=message-list.js.map