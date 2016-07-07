"use strict";
var messages_1 = require('./messages/messages');
var assets_1 = require('./assets/assets');
var DataTableBasicUsageComponent_1 = require("./test/DataTableBasicUsageComponent");
var MyTable_1 = require("./table/MyTable");
var AgentsManager_1 = require("./agents/AgentsManager");
exports.AppRoutes = [
    { path: '', redirectTo: '/dashboard', terminal: true },
    { path: 'dashboard/messages', component: messages_1.MessagesComponent, useAsDefault: true },
    { path: 'dashboard/assets', component: assets_1.AssetsComponent },
    { path: 'dashboard/table', component: MyTable_1.TableComponent },
    { path: 'dashboard/agents', component: AgentsManager_1.AgentsManager },
    { path: 'dashboard', component: DataTableBasicUsageComponent_1.DataTableBasicUsageComponent }
];
//# sourceMappingURL=routes.js.map