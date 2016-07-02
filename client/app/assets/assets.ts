import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { IconPanel } from './icon-panel';
import { IconList } from './icon-list';
import { Icon } from './icon-model';


@Component({
    selector: 'assets-app',
    templateUrl: 'app/assets/assets.html',
    styleUrls: ['app/assets/assets.css'],
    directives: [IconPanel, IconList, ROUTER_DIRECTIVES]
})

export class AssetsComponent {
    icons: Icon [];

    constructor () {
        this.icons = [];
    }

    onMessagesAdded (icon: Icon) {
        this.icons.push(icon);
    }
}
