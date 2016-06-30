import {Component, Input} from '@angular/core';
import { MdList } from '@angular2-material/list';
import { MessageItem } from './message-item';
import { Message } from './message';

@Component({
    selector: 'message-list',
    templateUrl: 'app/messages/message-list.html',
    directives: [MessageItem, MdList]
})

export class MessageList {
    @Input () messages: Message[];
}