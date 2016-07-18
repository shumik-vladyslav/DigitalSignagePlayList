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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var content_add_1 = require('../content-add/content-add');
var asset_library_1 = require("../assets/asset-library");
var ContentManager = (function () {
    function ContentManager(ar, myrouter) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.selectedIndex = 0;
    }
    ContentManager.prototype.onModalClose = function () {
        this.isAddContent = false;
        var link = ['/content-manager'];
        this.myrouter.navigate(link);
    };
    ContentManager.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.ar.params.subscribe(function (params) {
            switch (params['contm']) {
                case "add":
                    _this.isAddContent = true;
                    break;
                case "remove":
                    _this.isAddContent = false;
                    break;
            }
            ;
        });
        /*        this.router.navigate(['./files']);*/
    };
    ContentManager.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    ContentManager = __decorate([
        core_1.Component({
            selector: 'content-manager',
            template: "\n                <h2>Content manager</h2>\n                <nav>\n                    <a [routerLink]=\"['./add/files']\" class=\"btn\"><span class=\"fa fa-messages\"></span> Add</a>\n                </nav>\n                <div>\n                    <asset-library></asset-library>\n                </div>\n                <div *ngIf=\"isAddContent\">\n                  <div id=\"myModal\" class=\"modal\" role=\"dialog\">\n                      <div class=\"modal-dialog\">                      \n                        <div class=\"modal-content\">\n                          <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" (click)=\"onModalClose()\">&times;</button>\n                            <h4 class=\"modal-title\">Add content</h4>\n                          </div>\n                          <div class=\"modal-body\">\n                            <add-content></add-content>\n                          </div>\n                          <div class=\"modal-footer\">\n\n                          </div>\n                        </div>\n                    \n                      </div>\n                  </div>\n                </div>\n              ",
            styles: ["\n                .modal {\n                    display: block;\n                    background-color: rgba(0, 0, 0, 0.31);\n                }\n            "],
            directives: [router_1.ROUTER_DIRECTIVES, content_add_1.AddContent, asset_library_1.AssetLibrary]
        })
    ], ContentManager);
    return ContentManager;
}());
exports.ContentManager = ContentManager;
exports.contentmanagerRoutes = [
    /*    ...addRoutes,*/
    { path: 'content-manager', component: ContentManager },
    { path: 'content-manager/:contm/:contm2', component: ContentManager }
];
//# sourceMappingURL=content-manager.js.map