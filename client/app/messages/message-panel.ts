import {Component, Input, Output, EventEmitter} from '@angular/core';

import {MATERIAL_DIRECTIVES} from 'ng2-material';

import {MessageList} from './message-list';
import {Message} from './message-model';

@Component({
    selector: 'message-panel',
    templateUrl: 'app/messages/message-panel.html',
    styleUrls: ['app/messages/message-panel.css'],
    directives: [MessageList, MATERIAL_DIRECTIVES]
})

export class MessagePanel {
    @Output () added = new EventEmitter();
    @Output () deleted = new EventEmitter();
   
    @Input () message: Message;
    @Input () messages: Message [];

    add (title: string){
         this.added.emit(new Message(title));
    }

    /*del () {
        this.deleted.emit();
    }*/
}