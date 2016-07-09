
import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Message} from './message-model';


@Component({
    selector: 'message-tools',
    templateUrl: 'app/messages/message-tools.html',
    styleUrls: ['app/messages/message-tools.css'],
})

export class MessageTools {
    @Input () message: Message;
    @Input () messages: Message[];

    @Output () deleted = new EventEmitter();
    @Output () added = new EventEmitter();
    @Output () saved = new EventEmitter();

    add (title: string){
        this.added.emit(new Message(title));
    }

    del () {
        this.deleted.emit();
    }
    
    save () {
        this.saved.emit();
    }
}