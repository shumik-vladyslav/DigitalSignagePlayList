import {Component, Input} from '@angular/core';
import { MdList } from '@angular2-material/list';
import { MessageItem } from './message-item';
import { Message } from './message-model';

@Component({
    selector: 'message-list',
    templateUrl: 'app/messages/message-list.html',
    directives: [MessageItem, MdList]
})

export class MessageList {
    @Input () messages: Message[];
    @Input () message: Message;

    onMessageDeleted (message: Message) {
        if (message) {
            let index = this.messages.indexOf(message);
            if (index > -1) {
                this.messages.splice(index, 1);
            }
        }
    }
}