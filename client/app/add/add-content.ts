/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'add-content',
    template: `
        <h1>Add-content</h1>
        <nav>
            <a [routerLink]="['/dashboard/content-manager/add/files']" class="btn"><span class="fa fa-messages"></span> File</a>
            <a [routerLink]="['/dashboard/content-manager/add/rss']" class="btn"><span class="fa fa-messages"></span> RSS</a>
            <a [routerLink]="['/dashboard/content-manager/add/web-content']" class="btn"><span class="fa fa-messages"></span> URL</a>
        </nav>
        <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class AddContent {}
