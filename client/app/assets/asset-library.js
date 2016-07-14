/**
 * Created by Dmitriy Prilutsky on 14.07.2016.
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
var assets_service_1 = require('../services/assets-service');
var AssetLibrary = (function () {
    function AssetLibrary(service) {
        this.service = service;
        this.cartItems = [new assets_service_1.Asset()];
    }
    AssetLibrary.prototype.ngOnInit = function () {
        this.getData();
    };
    AssetLibrary.prototype.getData = function () {
        var _this = this;
        this.service.getData()
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
        {
        }
    };
    AssetLibrary.prototype.onClickItem = function (item) {
        this.fullItem = item;
    };
    AssetLibrary.prototype.hideFullImage = function () {
        this.fullItem = null;
    };
    AssetLibrary = __decorate([
        core_1.Component({
            selector: 'asset-library',
            template: "<div class=\"asset-library\">\n                     <md-content>\n                         <div class=\"card\" *ngFor=\"let item of data\">\n                            <md-card>\n                                      <img md-card-sm-image src=\" {{ item.thumb }} \" (click)=\"onClickItem(item)\">\n                            </md-card>\n                         </div>\n                     </md-content>\n                     <div class=\"full-image\" *ngIf=\"fullItem\"> \n                         <img src=\" {{ fullItem.img }} \" width=\"200\" (click)=\"hideFullImage()\">\n                     </div>\n               </div>\n                ",
            styles: ["\n                .card {\n                    height: 128px;\n                    width: 128px;\n                    float: left;\n                }\n            "],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [assets_service_1.AssetsService]
        }), 
        __metadata('design:paramtypes', [assets_service_1.AssetsService])
    ], AssetLibrary);
    return AssetLibrary;
}());
exports.AssetLibrary = AssetLibrary;
//# sourceMappingURL=asset-library.js.map