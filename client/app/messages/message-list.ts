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
        directives: [MdCheckbox]
    })

export class MessageList {
    @Input () messages: IMessage[];
    @Input () message: IMessage;

    toggleEditable (message:IMessage) {
        this.message = message;
        this.messages.forEach(function(message){
            message.editable = false;
        });
        this.message.editable = !this.message.editable;
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
        this.message.selected = !this.message.selected;
    }
}