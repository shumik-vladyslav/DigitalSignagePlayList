/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var messages_main_1 = require('./messages/messages-main');
var assets_main_1 = require('./assets/assets-main');
var content_manager_1 = require('./content-manager/content-manager');
var play_list_1 = require("./play-list/play-list");
exports.routes = content_manager_1.contentmanagerRoutes.concat([
    /*    ...addRoutes,*/
    { path: '', component: messages_main_1.MessagesMain },
    { path: 'assets', component: assets_main_1.AssetsMain },
    /*{ path: 'assets/upload', component:UploadFiles},
    { path: 'files/upload', component:UploadFiles},*!/*/
    { path: 'messages', component: messages_main_1.MessagesMain },
    { path: 'playlist-editor', component: play_list_1.PlayList },
]);
exports.appRouterProviders = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map