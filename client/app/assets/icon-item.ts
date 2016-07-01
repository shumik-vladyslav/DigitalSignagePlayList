
import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Icon } from './icon';

@Component({
    selector: 'icon-item',
    templateUrl: './icon-item.html'
})

export class IconItem {
    @Input () icon: Icon;

    @Output () edited = new EventEmitter();
}