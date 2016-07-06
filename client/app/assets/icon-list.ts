import {Component, Input} from '@angular/core';
import { IconItem } from './icon-item';
import { Icon } from './icon-model';

@Component({
    selector: 'icon-list',
    templateUrl: 'app/assets/icon-list.html',
    directives: [IconItem]
})

export class IconList {
    @Input () icons: Icon[];
}