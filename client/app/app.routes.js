/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var messages_main_1 = require('./messages/messages-main');
var MyTable_1 = require('./table/MyTable');
var AgentsManager_1 = require('./agents/AgentsManager');
var contentmanager_1 = require('./contentmanager/contentmanager');
exports.routes = contentmanager_1.contentmanagerRoutes.concat([
    /*    ...addRoutes,*/
    { path: '', component: messages_main_1.MessagesMain },
    /* { path: 'assets', component: AssetsMain },
     { path: 'assets/upload', component:UploadFiles},
     { path: 'files/upload', component:UploadFiles},*/
    { path: 'messages', component: messages_main_1.MessagesMain },
    { path: 'table', component: MyTable_1.TableComponent },
    { path: 'agents', component: AgentsManager_1.AgentsManager },
]);
exports.appRouterProviders = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map