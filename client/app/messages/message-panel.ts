import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MessageList} from './message-list';
import {Message} from './message';

@Component({
    selector: 'message-panel',
    templateUrl: 'app/messages/message-panel.html',
    styleUrls: ['app/messages/message-panel.css'],
    directives: [MessageList]
})

export class MessagePanel {
    @Output () added = new EventEmitter();
   
    @Input () message: Message;
    @Input () messages: Message [];
    

    add (title: string){
         this.added.emit(new Message(title));
    }
}