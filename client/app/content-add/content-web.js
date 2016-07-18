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
var WebContent = (function () {
    function WebContent(router) {
        this.router = router;
        this.url = '';
    }
    WebContent.prototype.onChange = function (input) {
    };
    WebContent.prototype.goBack = function () {
        var link = ['/content-manager'];
        this.router.navigate(link);
    };
    WebContent = __decorate([
        core_1.Component({
            selector: 'web-content',
            template: "\n                <form class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                    <label class=\"col-sm-1 control-label\" for=\"UrlWeb\">URL</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" name=\"url\" class=\"form-control\" id=\"UrlWeb\" placeholder=\"Enter Url\" #urlInput (change)=\"onChange(urlInput.value)\">\n                    </div>\n                    </div>\n                    <div id=\"web-content-view\">\n                    \n                    </div>\n                    <div class=\"buttons\">\n                        <button type=\"submit\" class=\"btn btn-default\">Save</button>\n                        <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n                    </div>\n                </form>\n              ",
            styles: ["\n               .form-horizontal {\n                 margin: 20px 20px;\n                 height: 350px;\n                 position: relative;\n               }\n               \n               .buttons {\n                 position: absolute;\n                 top: 90%;\n                 left: 60%;\n                 width: 170px;\n               }\n               \n               .btn {\n                 margin-left: 20px;\n               }\n              "]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], WebContent);
    return WebContent;
}());
exports.WebContent = WebContent;
//# sourceMappingURL=content-web.js.map