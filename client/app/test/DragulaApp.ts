/**
 * Created by Vlad on 7/8/2016.
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {EXAMPLES} from './examples';

@Component({
    selector: 'example-app',
    templateUrl: './app/test/example-app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [EXAMPLES]
})
export class DragulaAppApp {}