/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var add_content_1 = require('../add/add-content');
var contentmanager_1 = require('./contentmanager');
exports.contentmanagerRoutes = [
    /*    ...addRoutes,*/
    { path: 'content-manager', component: contentmanager_1.ContentManager },
    { path: 'content-manager/add/:id', component: add_content_1.AddContent }
];
//# sourceMappingURL=contentmanager.route.js.map