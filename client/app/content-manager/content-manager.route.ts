/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { RouterConfig } from '@angular/router';

import { AddContent }  from '../content-add/content-add';
import { ContentManager } from './content-manager';
import { addRoutes } from "../content-add/add.routes";


export const contentmanagerRoutes: RouterConfig = [
/*    ...addRoutes,*/
    { path: 'content-manager', component:ContentManager },
    { path: 'content-manager/add/:id', component: AddContent }
];

