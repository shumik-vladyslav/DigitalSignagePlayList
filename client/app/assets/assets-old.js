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
var AssetsMain = (function () {
    function AssetsMain(service) {
        this.service = service;
        this.cart = [];
    }
    AssetsMain.prototype.ngOnInit = function () {
        this.getData();
    };
    AssetsMain.prototype.getData = function () {
        var _this = this;
        this.service.getData()
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
        {
        }
    };
    AssetsMain.prototype.showFullImage = function (item) {
        item.full = item;
    };
    AssetsMain.prototype.hideFullImage = function (item) {
        item.full = '';
    };
    AssetsMain.prototype.onDragEnd = function (event, item) {
        console.log(event);
    };
    AssetsMain.prototype.toCard = function (item) {
        this.cart.push(item);
    };
    AssetsMain.prototype.dropCard = function (item) {
        if (item) {
            var index = this.cart.indexOf(item);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        }
    };
    AssetsMain = __decorate([
        core_1.Component({
            selector: 'assets-app',
            template: "\n               <div class =\"panel panel-default\">\n               <div class =\"panel-heading\">\n                   <div class = \"cart\">\n                       <div class=\"item\" *ngFor=\"let item of cart\" layout=\"row\">\n                                <img src=\" {{ item.img }} \" width=\"128\" (dragend)=\"dropCard(item)\">\n                       </div>\n                   </div>\n               </div>\n               <div class=\"panel-body\">\n                     <md-content>\n         \n                     <div class=\"card\" *ngFor=\"let item of data\">\n                        <md-card>\n                                  <img md-card-sm-image src=\" {{ item.thumb }} \" (click)=\"showFullImage(item)\" (dragend)=\"onDragEnd($event, item)\">\n                        </md-card>\n                        <div *ngIf=\"item.full\"> \n                           <img src=\" {{ item.img }} \" width=\"200\" (click)=\"hideFullImage(item)\">\n                        </div>\n                     </div>\n                     </md-content>\n               </div>\n               </div>\n                ",
            styleUrls: ['app/assets/main.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [assets_service_1.AssetsService]
        }), 
        __metadata('design:paramtypes', [assets_service_1.AssetsService])
    ], AssetsMain);
    return AssetsMain;
}());
exports.AssetsMain = AssetsMain;
//# sourceMappingURL=assets-old.js.map