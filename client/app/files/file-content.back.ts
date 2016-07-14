/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'file-content',
    template:`
        <a [routerLink]="['/dashboard/content-manager/files/upload']" class="btn"><span class="fa fa-messages"></span> Browse</a>
        <form>
         <!-- <div class="form-group">
               <button type="button" class="btn btn-default" (click)="goUpload()">Browse</button>
          </div>-->
          <button type="submit" class="btn btn-default">Upload</button>
          <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
        </form>
  `,
    styles:[`
            form {
            width: 300px;
            height: 300px;
            }
    `]
    ,
    directives: [ROUTER_DIRECTIVES]
})

export class FileContent {
    constructor(
        private router: Router) {
    }

    goBack() {
        let link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    }

    /*goUpload() {
        let link = ['dashboard/assets/upload'];
        this.router.navigate(link);
    }*/
}
