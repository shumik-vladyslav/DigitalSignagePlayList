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
var FileContent = (function () {
    function FileContent(router) {
        this.router = router;
    }
    FileContent.prototype.goBack = function () {
        var link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    };
    FileContent = __decorate([
        core_1.Component({
            selector: 'file-content',
            template: "\n        <a [routerLink]=\"['/dashboard/content-manager/files/upload']\" class=\"btn\"><span class=\"fa fa-messages\"></span> Browse</a>\n        <form>\n         <!-- <div class=\"form-group\">\n               <button type=\"button\" class=\"btn btn-default\" (click)=\"goUpload()\">Browse</button>\n          </div>-->\n          <button type=\"submit\" class=\"btn btn-default\">Upload</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n        </form>\n  ",
            styles: ["\n            form {\n            width: 300px;\n            height: 300px;\n            }\n    "],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], FileContent);
    return FileContent;
}());
exports.FileContent = FileContent;
//# sourceMappingURL=file-content.back.js.map