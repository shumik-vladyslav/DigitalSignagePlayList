/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { AddContent} from '../add/add-content';



@Component({
    selector: 'rss-content',
    template: `
        <form>
          <div class="form-group">
            <label for="UrlOfRSS">URL</label>
            <input type="text" class="form-control" id="UrlOfRSS" placeholder="Enter Url of RSS">
          </div>
          <button type="submit" class="btn btn-default">Save</button>
          <button type="button" class="btn btn-default" (click)="back()">Close</button>
        </form>
  `,
})

export class RssContent {
    @Output () goback = new EventEmitter();

    back () {
        this.goback.emit(null);
    }

}
