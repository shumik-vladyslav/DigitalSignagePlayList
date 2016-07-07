import {Component, Input} from '@angular/core';
import { MdCheckbox } from '@angular2-material/checkbox';

interface IMessage {
    title: string;
    active: boolean;
    selected: boolean;
    editable: boolean;
}

@Component({
    selector: 'message-list',
    template:  `<md-data-table>
                <thead>
                <tr>
                    <th class="md-text-cell">Active</th>
                    <th class="md-text-cell">Content</th>
                </tr>
                </thead>
                <tbody *ngIf="messages.length > 0">
                    <tr *ngFor="let message of messages" [ngClass]="{'selected': message.selected}" (click)="onSelected(message)">
                        <td class="md-text-cell">
                            <md-checkbox (change)="toggleChangeActive(message)" [checked]="message.active"></md-checkbox>
                        </td>
                        <td class="md-text-cell" contenteditable = "true" (input)="inputChange(message, $event)" (click)="toggleEditable(message)">
                            {{ message.title }}
                        </td>
                </tr>
                </tbody>
                </md-data-table>
                `,
    styleUrls: ['app/messages/message-list.css'],
    directives: [MdCheckbox]
})

export class MessageList {
    @Input () messages: IMessage[];
    @Input () message: IMessage;

    toggleEditable (message:IMessage) {
        message.editable = !message.editable;
    }

    toggleChangeActive (message:IMessage) {
        this.message = message;
        this.message.active = !this.message.active;
        console.log(message);
    }

    inputChange (message:IMessage, event) {
        this.message = message;
        this.message.title = event.target.outerText;
    }

    onSelected (message:IMessage) {
        this.message = message;
        this.messages.forEach(function(message){
            message.selected = false;
        });
        console.log("sel");
        this.message.selected = !this.message.selected;
    }
}