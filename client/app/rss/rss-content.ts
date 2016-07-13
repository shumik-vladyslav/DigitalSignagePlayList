/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'rss-content',
    template: `
        <h1>RSS</h1>
        <form>
          <div class="form-group">
            <label for="UrlOfRSS">URL</label>
            <input type="text" class="form-control" id="UrlOfRSS" placeholder="Enter Url of RSS">
          </div>
          <button type="submit" class="btn btn-default">Save</button>
          <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
        </form>
  `,
})

export class RssContent {

    constructor(
        private router: Router) {
    }

    goBack() {
        let link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    }
}
