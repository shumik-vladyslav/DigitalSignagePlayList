/**
 * Created by Dmitriy Prilutsky on 01.07.2016.
 */
"use strict";
var messages_1 = require('./messages/messages');
var assets_1 = require('./assets/assets');
var DataTableBasicUsageComponent_1 = require("./test/DataTableBasicUsageComponent");
exports.AppRoutes = [
    { path: '', redirectTo: '/dashboard', terminal: true },
    { path: 'dashboard/messages', component: messages_1.MessagesComponent, useAsDefault: true },
    { path: 'dashboard/assets', component: assets_1.AssetsComponent },
    { path: 'dashboard', component: DataTableBasicUsageComponent_1.DataTableBasicUsageComponent }
];
//# sourceMappingURL=routes.js.map