
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdInput} from '@angular2-material/input';
import { Message } from './message';

@Component({
    selector: 'md-list-item',
    templateUrl: 'app/messages/message-item.html',
    directives: [MdCheckbox, MdInput]
})

export class MessageItem {
    @Input () message: Message;

    /*@Output () edited = new EventEmitter();*/

    toggleChangeActive () {
        this.message.active =!this.message.active;
    }

    /*edit (message: Message, title: string) {
        this.edited.emit(message, title);
    }*/

    onMessageDeleted (message: Message) {
        console.log("message");
        /*if (message) {
         let index = this.messages.indexOf(message);
         if (index > -1) {
         this.messages.splice(index,1);
         }
         }*/
    }
}