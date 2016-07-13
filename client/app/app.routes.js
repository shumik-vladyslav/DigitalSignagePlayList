/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var messages_main_1 = require('./messages/messages-main');
var assets_main_1 = require('./assets/assets-main');
var MyTable_1 = require('./table/MyTable');
var AgentsManager_1 = require('./agents/AgentsManager');
var UploadFiles_1 = require("./assets/UploadFiles");
var contentmanager_route_1 = require('./contentmanager/contentmanager.route');
var add_routes_1 = require("./add/add.routes");
exports.routes = contentmanager_route_1.contentmanagerRoutes.concat(add_routes_1.addRoutes, [
    { path: '', component: messages_main_1.MessagesMain },
    { path: 'dashboard/assets', component: assets_main_1.AssetsMain },
    { path: 'dashboard/assets/upload', component: UploadFiles_1.UploadFiles },
    { path: 'dashboard/messages', component: messages_main_1.MessagesMain },
    { path: 'dashboard/table', component: MyTable_1.TableComponent },
    { path: 'dashboard/agents', component: AgentsManager_1.AgentsManager },
]);
exports.appRouterProviders = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map