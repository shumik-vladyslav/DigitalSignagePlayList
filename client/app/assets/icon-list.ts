import {Component, Input} from '@angular/core';
import { IconItem } from './icon-item';
import { Icon } from './icon';

@Component({
    selector: 'icon-list',
    templateUrl: './icon-list.html',
    directives: [IconItem]
})

export class IconList {
    @Input () icons: Icon[];
}