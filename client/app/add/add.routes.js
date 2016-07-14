"use strict";
var add_content_1 = require("./add-content");
exports.addRoutes = [
    {
        path: 'content-manager/add',
        component: add_content_1.AddContent,
    },
    {
        path: 'content-manager/add/:id',
        component: add_content_1.AddContent
    }
];
//# sourceMappingURL=add.routes.js.map