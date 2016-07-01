/**
 * Created by Dmitriy Prilutsky on 01.07.2016.
 */

import { MessagesComponent } from './messages/messages';
import { AssetsComponent } from './assets/assets';

export const AppRoutes = [
    { path: '', redirectTo: '/dashboard', terminal: true },
    { path: 'messages', component: MessagesComponent, useAsDefault: true},
    { path: 'assets', component: AssetsComponent },
]