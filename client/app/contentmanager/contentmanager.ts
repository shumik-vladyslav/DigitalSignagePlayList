/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'content-manager',
    template: `
        <h1>Content-manager</h1>
        <nav>
            <a [routerLink]="['/dashboard/content-manager/add']" class="btn"><span class="fa fa-messages"></span> Add</a>
        </nav>
        <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class ContentManager {}