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
var add_content_1 = require('../add/add-content');
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
            console.log(params);
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
    };
    ContentManager.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    ContentManager = __decorate([
        core_1.Component({
            selector: 'content-manager',
            template: "\n                <h2>Content manager</h2>\n                <nav>\n                    <a [routerLink]=\"['./add/files']\" class=\"btn\"><span class=\"fa fa-messages\"></span> Add</a>\n                </nav>\n                <div>\n                    <content-box></content-box>\n                </div>\n                <div *ngIf=\"isAddContent\">\n                  <div id=\"myModal\" class=\"modal\" role=\"dialog\">\n                      <div class=\"modal-dialog\">                      \n                        <div class=\"modal-content\">\n                          <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" (click)=\"onModalClose()\">&times;</button>\n                            <h4 class=\"modal-title\">Modal Header</h4>\n                          </div>\n                          <div class=\"modal-body\">\n                            <add-content></add-content>\n                          </div>\n                          <div class=\"modal-footer\">\n\n                          </div>\n                        </div>\n                    \n                  </div>\n                </div>\n                \n                \n                    \n                </div>\n              ",
            styles: ["\n                .modal {\n                    display: block;\n                    background-color: rgba(0, 0, 0, 0.31);\n                }\n            "],
            directives: [router_1.ROUTER_DIRECTIVES, add_content_1.AddContent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], ContentManager);
    return ContentManager;
}());
exports.ContentManager = ContentManager;
exports.contentmanagerRoutes = [
    { path: 'content-manager', component: ContentManager },
    { path: 'content-manager/:contm/:contm2', component: ContentManager }
];
//# sourceMappingURL=contentmanager.js.map