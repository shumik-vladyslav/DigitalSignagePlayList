/**
 * Created by Dmitriy Prilutsky on 04.07.2016.
 */
import { RouterConfig } from '@angular/router';

import { MessagesComponent } from './messages';

export const MessagesRoutes: RouterConfig = [
    {
        path: '',
        component: MessagesComponent
    }
];