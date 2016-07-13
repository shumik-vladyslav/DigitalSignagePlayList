/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var tabs_1 = require('@angular2-material/tabs');
var router_2 = require('@angular/router');
var AddContent = (function () {
    function AddContent(router) {
        this.router = router;
    }
    AddContent.prototype.goBack = function () {
        var link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    };
    AddContent = __decorate([
        core_1.Component({
            selector: 'add-content',
            template: "\n        <h1>Add content</h1>\n        <md-tab-group>\n          <md-tab>\n            <template md-tab-label><a [routerLink]=\"['/dashboard/content-manager/files']\" class=\"btn\"><span class=\"fa fa-messages\"></span> File</a></template>\n          </md-tab>\n          <md-tab>\n            <template md-tab-label><a [routerLink]=\"['/dashboard/content-manager/rss']\" class=\"btn\"><span class=\"fa fa-messages\"></span> RSS</a></template>\n          </md-tab>\n          <md-tab>\n            <template md-tab-label><a [routerLink]=\"['/dashboard/content-manager/web-content']\" class=\"btn\"><span class=\"fa fa-messages\"></span> URL</a></template>\n          </md-tab>\n        </md-tab-group>\n                \n        \n        \n        <!--<nav>\n            <a [routerLink]=\"['/dashboard/content-manager/add/files']\" class=\"btn\"><span class=\"fa fa-messages\"></span> File</a>\n            <a [routerLink]=\"['/dashboard/content-manager/add/rss']\" class=\"btn\"><span class=\"fa fa-messages\"></span> RSS</a>\n            <a [routerLink]=\"['/dashboard/content-manager/add/web-content']\" class=\"btn\"><span class=\"fa fa-messages\"></span> URL</a>\n        </nav>-->\n        <router-outlet></router-outlet>\n  ",
            directives: [router_2.ROUTER_DIRECTIVES, tabs_1.MD_TABS_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AddContent);
    return AddContent;
}());
exports.AddContent = AddContent;
//# sourceMappingURL=add-content.js.map