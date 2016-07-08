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
        this.cartItems = [];
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
    AssetsMain.prototype.onClickItem = function (item) {
        this.fullItem = item;
    };
    AssetsMain.prototype.hideFullImage = function () {
        this.fullItem = null;
    };
    AssetsMain.prototype.onDragEnd = function (evt) {
        this.dragItem = null;
    };
    AssetsMain.prototype.onDragEnter = function (evt) {
        this.toCart(this.dragItem);
        this.dragItem = null;
    };
    AssetsMain.prototype.onDragStart = function (item) {
        this.dragItem = item;
    };
    AssetsMain.prototype.onDragOut = function (evt) {
        this.offCart(this.dragItem);
    };
    AssetsMain.prototype.toCart = function (item) {
        if (item)
            this.cartItems.push(item);
    };
    AssetsMain.prototype.offCart = function (item) {
        if (item) {
            var index = this.cartItems.indexOf(item);
            console.log(index);
            if (index > -1) {
                this.cartItems.splice(index, 1);
            }
        }
    };
    AssetsMain = __decorate([
        core_1.Component({
            selector: 'assets-app',
            template: "\n               <div class =\"panel panel-default\">\n               <div class =\"panel-heading\">\n                   <div class = \"cart\" (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragOut($event)\">\n                       <div class=\"item\" *ngFor=\"let item of cartItems\" layout=\"row\">\n                                <img src=\" {{ item.img }} \" width=\"128\" (dragend)=\"dropCard(item)\">\n                       </div>\n                   </div>\n               </div>\n               <div class=\"panel-body\">\n                     <md-content>\n                         <div class=\"card\" *ngFor=\"let item of data\">\n                            <md-card>\n                                      <img md-card-sm-image src=\" {{ item.thumb }} \" (dragstart)=\"onDragStart(item)\" (click)=\"onClickItem(item)\">\n                            </md-card>\n                         </div>\n                     </md-content>\n                     <div class =\"modal\" *ngIf=\"fullItem\"> \n                         <img src=\" {{ fullItem.img }} \" width=\"200\" (click)=\"hideFullImage()\">\n                     </div>\n               </div>\n               </div>\n                ",
            styleUrls: ['app/assets/main.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [assets_service_1.AssetsService]
        }), 
        __metadata('design:paramtypes', [assets_service_1.AssetsService])
    ], AssetsMain);
    return AssetsMain;
}());
exports.AssetsMain = AssetsMain;
//# sourceMappingURL=assets-main.js.map