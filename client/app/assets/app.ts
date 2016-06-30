import { Component } from '@angular/core';
import { IconPanel } from './icon-panel';
import { IconList } from './icon-list';
import { Icon } from './icon';


@Component({
    selector: 'cms-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
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
