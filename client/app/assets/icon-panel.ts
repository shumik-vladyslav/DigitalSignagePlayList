import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IconList} from './icon-list';
import {Icon} from './icon-model';

@Component({
    selector: 'icon-panel',
    templateUrl: 'app/assets/icon-panel.html',
    styleUrls: ['app/assets/icon-panel.css'],
    directives: [IconList]
})

export class IconPanel {
    @Input() icon:Icon;
    @Input() icons:Icon [];
}