import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IconList} from './icon-list';
import {Icon} from './icon';

@Component({
    selector: 'icon-panel',
    templateUrl: './icon-panel.html',
    styleUrls: ['./icon-panel.css'],
    directives: [IconList]
})

export class IconPanel {
    @Input() icon:Icon;
    @Input() icons:Icon [];
}