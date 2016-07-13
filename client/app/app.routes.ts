/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { provideRouter, RouterConfig } from '@angular/router';


import { MessagesMain } from './messages/messages-main';
import { AssetsMain } from './assets/assets-main';
import { AssetsComponent } from './assets/assets';
import { TableComponent } from './table/MyTable';
import { AgentsManager } from './agents/AgentsManager';
import { DragulaAppApp } from "./test/DragulaApp";
import { contentmanagerRoutes } from './contentmanager/contentmanager.route';
import { addRoutes } from "./add/add.routes";

export const routes: RouterConfig = [
    ...contentmanagerRoutes,
    ...addRoutes,
    { path: '', component: MessagesMain },
    { path: 'dashboard/assets', component: AssetsMain },
    { path: 'dashboard/messages', component: MessagesMain},
    { path: 'dashboard/assets1', component: AssetsComponent },
    { path: 'dashboard/table', component:TableComponent },
    { path: 'dashboard/agents', component:AgentsManager },
    { path: 'dashboard/dragula', component:DragulaAppApp},
    { path: '**', redirectTo: '/dashboard/messages' }
]


export const appRouterProviders = [
    provideRouter(routes)
];
