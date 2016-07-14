/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { RouterConfig } from '@angular/router';

import { AddContent }  from '../content-add/content-add';
import { addRoutes } from "../content-add/add.routes";
import {AssetLibrary} from "../assets/asset-library";

@Component({
    selector: 'content-manager',
    template: `
                <h2>Content manager</h2>
                <nav>
                    <a [routerLink]="['./add/files']" class="btn"><span class="fa fa-messages"></span> Add</a>
                </nav>
                <div>
                    <asset-library></asset-library>
                </div>
                <div *ngIf="isAddContent">
                  <div id="myModal" class="modal" role="dialog">
                      <div class="modal-dialog">
         
                        <!-- Modal content-->
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" (click)="onModalClose()">&times;</button>
                            <h4 class="modal-title">Add content</h4>
                          </div>
                          <div class="modal-body">
                            <add-content></add-content>
                          </div>
                          <div class="modal-footer">

                          </div>
                        </div>
                    
                      </div>
                  </div>
                </div>
              `,
    styles: [ `
                .modal {
                    display: block;
                    background-color: rgba(0, 0, 0, 0.31);
                }
            `]
            ,
    directives: [ROUTER_DIRECTIVES, AddContent, AssetLibrary]
})

export class ContentManager {
    id:any;
    paramsSub:any;
    selectedIndex:number = 0;
    isAddContent:boolean;

    constructor (private ar:ActivatedRoute, private myrouter:Router) {

    }

    onModalClose () {
        this.isAddContent = false;
        let link = ['/content-manager'];
        this.myrouter.navigate(link);
    }

    ngOnInit() {
        this.paramsSub = this.ar.params.subscribe((params) => {
            switch (params['contm']) {
                case "add":
                    this.isAddContent = true;
                    break;
                case "remove":
                    this.isAddContent = false;
                    break;
            };
        });
        /*        this.router.navigate(['./files']);*/
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

}

export const contentmanagerRoutes: RouterConfig = [
    /*    ...addRoutes,*/
    { path: 'content-manager', component:ContentManager },
    { path: 'content-manager/:contm/:contm2', component: ContentManager }
];