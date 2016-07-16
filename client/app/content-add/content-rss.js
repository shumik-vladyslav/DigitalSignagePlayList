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
var rss_service_1 = require("../services/rss-service");
var platform_browser_1 = require("@angular/platform-browser");
var RSSView = (function () {
    function RSSView(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    RSSView.prototype.ngOnInit = function () {
        // this.rssContent = this._sanitizer.bypassSecurityTrustHtml(this.rssItem.content);
    };
    RSSView.prototype.onCapture = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rss_service_1.RSSItem)
    ], RSSView.prototype, "rssItem", void 0);
    RSSView = __decorate([
        core_1.Component({
            selector: 'rss-view',
            template: "\n        <div  class=\"rss-item\">\n            <div *ngIf=\"rssItem\" >\n              <h3>\n                {{rssItem.title}}            \n                </h3>\n                <div [innerHTML]=\"_sanitizer.bypassSecurityTrustHtml(rssItem.content)\" >            \n                </div>       \n            </div>           \n        </div>\n        <button class=\"btn btn-default\" (click)=\"onCapture()\">Capture</button>\n"
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService])
    ], RSSView);
    return RSSView;
}());
exports.RSSView = RSSView;
var RssContent = (function () {
    function RssContent(router, feed) {
        this.router = router;
        this.feed = feed;
        this.rssSelected = new rss_service_1.RSSItem({ title: 'Title', content: '<p>RSS Content</p>' });
    }
    RssContent.prototype.onGetFeed = function (input) {
        var _this = this;
        console.log(input);
        this.feed.getData(input).subscribe(function (data) {
            _this.rssfeeds = data;
            _this.selectedIndex = 0;
            _this.rssSelected = _this.rssfeeds[0];
            console.log(_this.rssSelected);
        }, function (error) { return _this.handleError = error; });
    };
    RssContent.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return errMsg;
    };
    RssContent.prototype.goBack = function () {
        var link = ['/content-manager'];
        this.router.navigate(link);
    };
    RssContent = __decorate([
        core_1.Component({
            selector: 'rss-content',
            directives: [RSSView],
            providers: [rss_service_1.RSSService],
            template: "\n                <div class=\"form-horizontal\">\n                  <div class=\"form-group\">\n                    <label class=\"col-sm-1  control-label\" for=\"UrlOfRSS\">URL</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" name=\"url\" class=\"form-control\" id=\"UrlOfRSS\" placeholder=\"Enter Url of RSS\" #urlInput >\n                        <button type=\"submit\" class=\"btn btn-default\" (click)=\"onGetFeed(urlInput.value)\">Get</button>\n                    </div>\n                  </div>\n                  <div class=\"rss-content-view\">\n                        <rss-view [rssItem]=\"rssSelected\" ></rss-view>                  \n            \n                  </div>\n                  <div class=\"buttons\">\n                      <button type=\"submit\" class=\"btn btn-default\">Save</button>\n                      <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n                  </div>\n                </div>\n             ",
            styles: ["\n               .form-horizontal {\n                 margin: 20px 20px;\n                 height: 350px;\n                 position: relative;\n               }\n               \n               .buttons {\n                 position: absolute;\n                 top: 90%;\n                 left: 60%;\n                 width: 170px;\n               }\n               .btn {\n                 margin-left: 20px;\n               }\n               .rss-content-view{\n               height: 200px;\n               }\n               rss-view{\n               width: 100%;\n               height: 250px;\n               \n               }\n              "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, rss_service_1.RSSService])
    ], RssContent);
    return RssContent;
}());
exports.RssContent = RssContent;
//# sourceMappingURL=content-rss.js.map