/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'add-content',
    template: `
                <div class="add-content">
                    <div class="add-content-title">
                        Add content
                    </div>
                    <md-tab-group>
                      <md-tab>
                        <template md-tab-label><a [routerLink]="['/dashboard/content-manager/add/files']" class="btn"><span class="fa fa-messages"></span> File</a></template>
                      </md-tab>
                      <md-tab>
                        <template md-tab-label><a [routerLink]="['/dashboard/content-manager/add/rss']" class="btn"><span class="fa fa-messages"></span> RSS</a></template>
                      </md-tab>
                      <md-tab>
                        <template md-tab-label><a [routerLink]="['/dashboard/content-manager/add/web-content']" class="btn"><span class="fa fa-messages"></span> URL</a></template>
                      </md-tab>
                    </md-tab-group>
                    <router-outlet></router-outlet>
                </div>
  `,
    styles:[`
            .add-content {
            width: 480px;
            height: 480px;
            border: 1px solid #000;
            margin: auto auto;
            }
            .add-content-title {
                margin-top: 20px;
                text-align: center;
                font-weight: bold;
            }
    `],
  directives: [ROUTER_DIRECTIVES, MD_TABS_DIRECTIVES]
})

export class AddContent {

    constructor(  private router: Router) {

    }

    ngOnInit() {
        this.router.navigate(['/dashboard/content-manager/add/files']);
    }
}
