/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';


@Component({
    selector: 'file-content',
    template: `
        <h1>File</h1>
        <form>
          <div class="form-group">
            <label for="InputFile">Browse</label>
            <input type="file" id="InputFile">
          </div>
          <button type="submit" class="btn btn-default">Upload</button>
          <button type="button" class="btn btn-default">Close</button>
        </form>
  `,

})

export class FileContent {}
