/**
 * Created by Dmitriy Prilutsky on 01.07.2016.
 */

import { MessagesComponent } from './messages/messages';
import { AssetsComponent } from './assets/assets';
import {DataTableBasicUsageComponent} from "./test/DataTableBasicUsageComponent";
import {TableComponent} from "./table/MyTable";
import {AgentsManager} from "./agents/AgentsManager";


export const AppRoutes = [
    { path: '', redirectTo: '/dashboard', terminal: true },
    { path: 'dashboard/messages', component: MessagesComponent, useAsDefault: true},
    { path: 'dashboard/assets', component: AssetsComponent },
    { path: 'dashboard/table', component:TableComponent },
    { path: 'dashboard/agents', component:AgentsManager },
    { path: 'dashboard', component:DataTableBasicUsageComponent}
]