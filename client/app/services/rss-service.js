/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var RSSItem = (function () {
    function RSSItem(obj) {
        for (var str in obj)
            this[str] = obj[str];
    }
    return RSSItem;
}());
exports.RSSItem = RSSItem;
var RSSService = (function () {
    function RSSService(http) {
        this.http = http;
        this.dataUrl = 'api/rss/';
    }
    RSSService.prototype.getData = function (url) {
        var _this = this;
        return this.http.get(this.dataUrl + encodeURIComponent(url))
            .map(function (data) { return _this.parse(data); })
            .catch(this.handleError);
    };
    RSSService.prototype.parse = function (res) {
        var body = res.json().data;
        var out = [];
        body.map(function (item) { out.push(new RSSItem(item)); });
        return out;
    };
    RSSService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    RSSService = __decorate([
        core_1.Injectable()
    ], RSSService);
    return RSSService;
}());
exports.RSSService = RSSService;
//# sourceMappingURL=rss-service.js.map