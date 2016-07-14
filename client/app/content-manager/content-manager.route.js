/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var content_add_1 = require('../content-add/content-add');
var content_manager_1 = require('./content-manager');
exports.contentmanagerRoutes = [
    /*    ...addRoutes,*/
    { path: 'content-manager', component: content_manager_1.ContentManager },
    { path: 'content-manager/add/:id', component: content_add_1.AddContent }
];
//# sourceMappingURL=content-manager.route.js.map