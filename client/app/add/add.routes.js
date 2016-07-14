/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var add_content_1 = require("./add-content");
var file_content_1 = require('../files/file-content');
var rss_content_1 = require('../rss/rss-content');
var web_content_1 = require('../web/web-content');
exports.addRoutes = [
    {
        path: 'dashboard/content-manager/add',
        component: add_content_1.AddContent,
        children: [
            { path: 'files', component: file_content_1.FileContent, },
            { path: 'rss', component: rss_content_1.RssContent },
            { path: 'web-content', component: web_content_1.WebContent }
        ]
    }
];
//# sourceMappingURL=add.routes.js.map