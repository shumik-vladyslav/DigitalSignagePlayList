"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var Asset = (function () {
    function Asset() {
    }
    return Asset;
}());
exports.Asset = Asset;
var AssetsService = (function () {
    function AssetsService(http) {
        this.dataUrl = 'api/assets/select-all';
    }
    AssetsService.prototype.getData = function () {
        var _this = this;
        return this.http.get(this.dataUrl)
            .map(function (data) { return _this.parse(data); })
            .catch(this.handleError);
    };
    AssetsService.prototype.addItem = function (name) {
        var body = JSON.stringify({ name: name });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.dataUrl, body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    };
    AssetsService.prototype.parse = function (res) {
        var body = res.json().data;
        //  console.log(body)
        body.forEach(function (item) {
            item.thumb = item.img = item.path;
        });
        return body || {};
    };
    AssetsService.prototype.parseOne = function (res) {
        var body = res.json();
        return body.data || {};
    };
    AssetsService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AssetsService = __decorate([
        core_2.Injectable(),
        __param(0, core_1.Inject(http_1.Http))
    ], AssetsService);
    return AssetsService;
}());
exports.AssetsService = AssetsService;
//# sourceMappingURL=assets-service.js.map