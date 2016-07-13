/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { RouterConfig } from '@angular/router';

import { AddContent }  from '../add/add-content';
import { ContentManager } from './contentmanager';


export const contentmanagerRoutes: RouterConfig = [
    { path: 'dashboard/content-manager', component:ContentManager}
];

