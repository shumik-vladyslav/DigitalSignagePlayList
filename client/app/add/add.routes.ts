/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { RouterConfig } from '@angular/router';

import { AddContent } from "./add-content";
import { FileContent }  from '../files/file-content';
import { RssContent }  from '../rss/rss-content';
import { WebContent }  from '../web/web-content';



export const addRoutes: RouterConfig = [
    {
        path: 'content-manager/add',
        component: AddContent,
     /*   children: [
            { path: 'files',  component: FileContent,},
            { path: 'rss',  component: RssContent },
            { path: 'web-content', component: WebContent }
        ]*/
    },
    {
        path: 'content-manager/add/:id',
        component: AddContent
    }
];