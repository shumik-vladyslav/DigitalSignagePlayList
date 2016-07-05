/**
 * Created by Dmitriy Prilutsky on 04.07.2016.
 */
import { RouterConfig } from '@angular/router';

import { AssetsComponent } from './assets';

export const AssetsRoutes: RouterConfig = [
    {
        path: 'dashboard/assets',
        component: AssetsComponent
    }
];