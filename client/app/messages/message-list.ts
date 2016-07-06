import {Component, Input} from '@angular/core';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdInput } from '@angular2-material/input';
/*import { MessageItem } from './message-item';*/
import { Message } from './message-model';

@Component({
    selector: 'md-data-table',
    template: `
                <thead>
                <tr>
                    <th class="md-text-cell">Active</th>
                    <th class="md-text-cell">Content</th>
                </tr>
                </thead>
                <tbody *ngIf="messages.length > 0">
                    <tr *ngFor="let message of messages" (deleted)="onMessageDeleted($event)">
                        <td class="md-text-cell">
                            <md-checkbox (change)="toggleChangeActive()"></md-checkbox>
                        </td>
                        <td class="md-text-cell">
                    <md-input #titleInput (change)="inputChange(titleInput.value)">{{ message.title }}</md-input>
                    </td>
                </tr>
                </tbody>
                `,
    directives: [MdCheckbox, MdInput]
})

export class MessageList {
    @Input () messages: Message[];
    @Input () message: Message;

    toggleChangeActive () {
        console.log("toggle")
        this.message.active =!this.message.active;
    }

    inputChange (title: string) {
        console.log("input")
        this.message.title = title;
    }

     /*del () {
     console.log("delete")
     this.deleted.emit(this.message);
     }*!/*/

    onMessageDeleted (message: Message) {
        if (message) {
            let index = this.messages.indexOf(message);
            if (index > -1) {
                this.messages.splice(index, 1);
            }
        }
    }
}