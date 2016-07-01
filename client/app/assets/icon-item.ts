
import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Icon } from './icon-model';

@Component({
    selector: 'icon-item',
    templateUrl: 'app/assets/icon-item.html'
})

export class IconItem {
    @Input () icon: Icon;

    @Output () edited = new EventEmitter();
}