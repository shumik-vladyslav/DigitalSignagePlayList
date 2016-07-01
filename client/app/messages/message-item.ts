
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdInput} from '@angular2-material/input';
import { Message } from './message-model';

@Component({
    selector: 'message-item',
    templateUrl: 'app/messages/message-item.html',
    styleUrls: ['app/messages/message-item.css'],
    directives: [MdCheckbox, MdInput]
})

export class MessageItem {
    @Input () message: Message;

    @Output () deleted = new EventEmitter();

    toggleChangeActive () {
        this.message.active =!this.message.active;
    }

    inputChange (title: string) {
        this.message.title = title;
    }

    del () {
        this.deleted.emit(this.message);
    }
}