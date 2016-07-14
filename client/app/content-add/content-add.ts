/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import {FileContent} from "./content-files";
import {RssContent} from "./content-rss";
import {WebContent} from "./content-web";



@Component({
    selector: 'add-content',
    template: `
                <div class="add-content">
                    <md-tab-group [(selectedIndex)]="selectedIndex">
                      <md-tab>
                        <template md-tab-label><a [routerLink]="['../files']" class="btn"><span class="fa fa-messages"></span> File</a></template>
                        <template md-tab-content>
                          <md-content class="md-padding">
                            <multiple-progressbar></multiple-progressbar>
                          </md-content>
                         </template>
                      </md-tab>
                      <md-tab>
                        <template md-tab-label><a [routerLink]="['../rss']" class="btn"><span class="fa fa-messages"></span> RSS</a></template>
                         <template md-tab-content>
                          <md-content class="md-padding">
                            <rss-content></rss-content>
                          </md-content>
                         </template>
                      </md-tab>
                      <md-tab>
                        <template md-tab-label><a [routerLink]="['../web-content']" class="btn"><span class="fa fa-messages"></span> URL</a></template>
                        <template md-tab-content>
                          <md-content class="md-padding">
                            <web-content></web-content>
                          </md-content>
                         </template>
                      </md-tab>
                    </md-tab-group>
                </div>
  `,
    styles:[`
            .add-content-title {
                margin-top: 20px;
                text-align: center;
                font-weight: bold;
            }
    `],
  directives: [ROUTER_DIRECTIVES, MD_TABS_DIRECTIVES, FileContent, RssContent, WebContent]
})

export class AddContent {
    contm2:any;
    paramsSub:any;
    selectedIndex:number = 0;

    constructor(  private router: Router, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.paramsSub = this.activatedRoute.params.subscribe((params) => {
            console.log(params)
            switch (params['contm2']) {
                case "files":
                    this.selectedIndex = 0;
                    break;
                case "rss":
                    this.selectedIndex = 1;
                    break;
                case "web-content":
                    this.selectedIndex = 2;
                    break;
            };
            this.contm2 = +params['contm2']
        });
/*        this.router.navigate(['./files']);*/
    }

    ngOnDestroy() {
            this.paramsSub.unsubscribe();
        }

    handleFocus(evt:Event) {

    }
}
