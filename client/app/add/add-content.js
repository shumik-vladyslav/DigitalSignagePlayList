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
var tabs_1 = require('@angular2-material/tabs');
var router_1 = require('@angular/router');
var file_content_1 = require("../files/file-content");
var rss_content_1 = require("../rss/rss-content");
var web_content_1 = require("../web/web-content");
var AddContent = (function () {
    function AddContent(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.selectedIndex = 0;
    }
    AddContent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            console.log(params);
            switch (params['contm2']) {
                case "files":
                    _this.selectedIndex = 0;
                    break;
                case "rss":
                    _this.selectedIndex = 1;
                    break;
                case "web-content":
                    _this.selectedIndex = 2;
                    break;
            }
            ;
            _this.id = +params['contm2'];
        });
    };
    AddContent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    AddContent.prototype.handleFocus = function (evt) {
    };
    AddContent = __decorate([
        core_1.Component({
            selector: 'add-content',
            template: "\n                <div class=\"add-content\">\n                    <div class=\"add-content-title\">\n                        Add content\n                    </div>\n                    <md-tab-group [(selectedIndex)]=\"selectedIndex\">\n                      <md-tab>\n                        <template md-tab-label><a [routerLink]=\"['../files']\" class=\"btn\"><span class=\"fa fa-messages\"></span> File</a></template>\n                        <template md-tab-content>\n                          <md-content class=\"md-padding\">\n                            <multiple-progressbar></multiple-progressbar>\n                          </md-content>\n                         </template>\n                      </md-tab>\n                      <md-tab>\n                        <template md-tab-label><a [routerLink]=\"['../rss']\" class=\"btn\"><span class=\"fa fa-messages\"></span> RSS</a></template>\n                         <template md-tab-content>\n                          <md-content class=\"md-padding\">\n                            <rss-content></rss-content>\n                          </md-content>\n                         </template>\n                      </md-tab>\n                      <md-tab>\n                        <template md-tab-label><a [routerLink]=\"['../web-content']\" class=\"btn\"><span class=\"fa fa-messages\"></span> URL</a></template>\n                        <template md-tab-content>\n                          <md-content class=\"md-padding\">\n                            <web-content></web-content>\n                          </md-content>\n                         </template>\n                      </md-tab>\n                    </md-tab-group>\n                </div>\n  ",
            styles: ["\n            .add-content {\n            width: 480px;\n            height: 480px;\n            border: 1px solid #000;\n            margin: auto auto;\n            }\n            .add-content-title {\n                margin-top: 20px;\n                text-align: center;\n                font-weight: bold;\n            }\n    "],
            directives: [router_1.ROUTER_DIRECTIVES, tabs_1.MD_TABS_DIRECTIVES, file_content_1.FileContent, rss_content_1.RssContent, web_content_1.WebContent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], AddContent);
    return AddContent;
}());
exports.AddContent = AddContent;
//# sourceMappingURL=add-content.js.map