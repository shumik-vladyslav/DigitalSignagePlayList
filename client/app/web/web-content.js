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
var WebContent = (function () {
    function WebContent() {
    }
    WebContent = __decorate([
        core_1.Component({
            selector: 'web-content',
            template: "\n        <form>\n          <div class=\"form-group\">\n            <label for=\"UrlWeb\">URL</label>\n            <input type=\"text\" class=\"form-control\" id=\"UrlWeb\" placeholder=\"Enter Url\">\n          </div>\n          <button type=\"submit\" class=\"btn btn-default\">Save</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n        </form>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], WebContent);
    return WebContent;
}());
exports.WebContent = WebContent;
//# sourceMappingURL=web-content.js.map