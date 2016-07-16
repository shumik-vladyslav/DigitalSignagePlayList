/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {RSSService, RSSItem} from "../services/rss-service";
import {DomSanitizationService, SafeHtml} from "@angular/platform-browser";
import {buffer} from "rxjs/operator/buffer";

@Component({
    selector:'rss-view',
    template:`
        <div  class="rss-item">
            <div *ngIf="rssItem" >
              <h3>
                {{rssItem.title}}            
                </h3>
                <div [innerHTML]="_sanitizer.bypassSecurityTrustHtml(rssItem.content)" >            
                </div>       
            </div>           
        </div>
        <button class="btn btn-default" (click)="onCapture()">Capture</button>
`


})

export class RSSView implements OnInit{
    @Input() rssItem:RSSItem;
    rssContent:SafeHtml;

    constructor(
        private _sanitizer:DomSanitizationService
    ){

    }
    ngOnInit(): void {
       // this.rssContent = this._sanitizer.bypassSecurityTrustHtml(this.rssItem.content);
    }

    onCapture():void{

    }
}



@Component({
    selector: 'rss-content',
    directives:[RSSView],
    providers: [RSSService],
    template: `
                <div class="form-horizontal">
                  <div class="form-group">
                    <label class="col-sm-1  control-label" for="UrlOfRSS">URL</label>
                    <div class="col-sm-10">
                        <input type="text" name="url" class="form-control" id="UrlOfRSS" placeholder="Enter Url of RSS" #urlInput >
                        <button type="submit" class="btn btn-default" (click)="onGetFeed(urlInput.value)">Get</button>
                    </div>
                  </div>
                  <div class="rss-content-view">
                        <rss-view [rssItem]="rssSelected" ></rss-view>                  
            
                  </div>
                  <div class="buttons">
                      <button type="submit" class="btn btn-default">Save</button>
                      <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
                  </div>
                </div>
             `,
    styles : [`
               .form-horizontal {
                 margin: 20px 20px;
                 height: 350px;
                 position: relative;
               }
               
               .buttons {
                 position: absolute;
                 top: 90%;
                 left: 60%;
                 width: 170px;
               }
               .btn {
                 margin-left: 20px;
               }
               .rss-content-view{
               height: 200px;
               }
               rss-view{
               width: 100%;
               height: 250px;
               
               }
              `]
})

export class RssContent {
    rssfeeds:RSSItem[];
    rssSelected:RSSItem = new RSSItem({title:'Title',content:'<p>RSS Content</p>'});
    private selectedIndex:number;
    constructor(private router: Router, private feed:RSSService) {

    }

    onGetFeed (input:string) {
        console.log(input);
        this.feed.getData(input).subscribe(
            data => {
                this.rssfeeds = data;
                this.selectedIndex = 0;
                this.rssSelected = this.rssfeeds[0];
                console.log(this.rssSelected);
            },
            error =>  this.handleError = <any>error

        )


    }


    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return errMsg;
    }


    goBack() {
        let link = ['/content-manager'];
        this.router.navigate(link);
    }
}


