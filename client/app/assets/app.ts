import { Component } from '@angular/core';
import { IconPanel } from './icon-panel';
import { IconList } from './icon-list';
import { Icon } from './icon';


@Component({
    selector: 'cms-app',
    templateUrl: './messages.html',
    styleUrls: ['./messages.css'],
    directives: [IconPanel, IconList]
})
export class Assets {
    icons: Icon [];

    constructor () {
        this.icons = [];
    }

    onMessagesAdded (icon: Icon) {
        this.icons.push(icon);
    }
}
