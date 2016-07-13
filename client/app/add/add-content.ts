/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { RssContent } from '../rss/rss-content';

@Component({
    selector: 'add-content',
    template: `
        <h1>Add content</h1>
        <md-tab-group>
          <md-tab>
            <template md-tab-label><a [routerLink]="['/dashboard/content-manager/files']" class="btn"><span class="fa fa-messages"></span> File</a></template>
          </md-tab>
          <md-tab>
            <template md-tab-label><a [routerLink]="['/dashboard/content-manager/rss']" class="btn"><span class="fa fa-messages"></span> RSS</a></template>
          </md-tab>
          <md-tab>
            <template md-tab-label><a [routerLink]="['/dashboard/content-manager/web-content']" class="btn"><span class="fa fa-messages"></span> URL</a></template>
          </md-tab>
        </md-tab-group>
                
        
        
        <!--<nav>
            <a [routerLink]="['/dashboard/content-manager/add/files']" class="btn"><span class="fa fa-messages"></span> File</a>
            <a [routerLink]="['/dashboard/content-manager/add/rss']" class="btn"><span class="fa fa-messages"></span> RSS</a>
            <a [routerLink]="['/dashboard/content-manager/add/web-content']" class="btn"><span class="fa fa-messages"></span> URL</a>
        </nav>-->
        <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES, MD_TABS_DIRECTIVES]
})

export class AddContent {
    constructor(
        private router: Router) {
    }

    goBack() {
        let link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    }
}
