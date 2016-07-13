/**
 * Created by Dmitriy Prilutsky on 04.07.2016.
 */
import { RouterConfig } from '@angular/router';

import { MessagesMain } from './messages-main';

export const MessagesRoutes: RouterConfig = [
    {
        path: '',
        component: MessagesMain
    }
];