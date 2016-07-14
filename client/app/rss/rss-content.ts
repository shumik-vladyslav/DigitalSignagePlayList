/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'rss-content',
    template: `
                <form class="form-horizontal">
                  <div class="form-group">
                    <label class="col-sm-1  control-label" for="UrlOfRSS">URL</label>
                    <div class="col-sm-10">
                        <input type="text" name="url" class="form-control" id="UrlOfRSS" placeholder="Enter Url of RSS" #urlInput (change)="onChange(urlInput.value)">
                    </div>
                  </div>
                  <div id="rss-content-view">
            
                  </div>
                  <div class="buttons">
                      <button type="submit" class="btn btn-default">Save</button>
                      <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
                  </div>
                </form>
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
              `]
})

export class RssContent {
    constructor(private router: Router, private http:Http) {

    }

    onChange (input:string) {
        console.log(input)

        this.http.get(input)
            .map(this.parse)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body = res.json().data;
        body.forEach (function (item) {

        })

        return body;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return errMsg;
    }


    goBack() {
        let link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    }
}
