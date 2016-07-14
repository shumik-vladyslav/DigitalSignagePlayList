/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { RouterConfig } from '@angular/router';

import { AddContent }  from '../add/add-content';
import { ContentManager } from './contentmanager';
import { addRoutes } from "../add/add.routes";


export const contentmanagerRoutes: RouterConfig = [
/*    ...addRoutes,*/
    { path: 'content-manager', component:ContentManager },
    { path: 'content-manager/add/:id', component: AddContent }
];

