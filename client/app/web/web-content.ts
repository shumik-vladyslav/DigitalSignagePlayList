/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';

@Component({
    selector: 'web-content',
    template: `
        <h1>URL</h1>
        <form>
          <div class="form-group">
            <label for="UrlWeb">URL</label>
            <input type="text" class="form-control" id="UrlWeb" placeholder="Enter Url">
          </div>
          <button type="submit" class="btn btn-default">Save</button>
          <button type="button" class="btn btn-default">Close</button>
        </form>
  `,

})

export class WebContent {}
