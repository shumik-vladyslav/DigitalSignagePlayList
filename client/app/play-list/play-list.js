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
var service_1 = require('./service');
var PlayList = (function () {
    function PlayList(service) {
        this.service = service;
        this.cartItems = [new service_1.Asset()];
    }
    PlayList.prototype.ngOnInit = function () {
        this.getData();
    };
    PlayList.prototype.getData = function () {
        var _this = this;
        this.service.getData()
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
    };
    PlayList.prototype.onClickItem = function (item) {
        this.fullItem = item;
    };
    PlayList.prototype.hideFullImage = function () {
        this.fullItem = null;
    };
    PlayList.prototype.onDragEnd = function (evt) {
        this.dragItem = null;
    };
    PlayList.prototype.onDragEnter = function (evt) {
        this.toCart(this.dragItem);
    };
    PlayList.prototype.onDragStart = function (item) {
        this.isMove = false;
        this.dragItem = item;
    };
    PlayList.prototype.onDragOut = function (evt) {
        if (!this.isMove)
            this.offCart(this.dragItem);
    };
    PlayList.prototype.onSpacerDragEnter = function (item) {
        var i = this.cartItems.indexOf(item);
        this.insertToCardAt(this.dragItem, i);
    };
    PlayList.prototype.insertToCardAt = function (item, i) {
        console.log(item, i, this.isMove);
        if (item && i !== -1) {
            if (this.isMove) {
                console.log(22);
                var index = this.cartItems.indexOf(item);
                if (index > -1) {
                    this.cartItems.splice(index, 1);
                }
                this.cartItems.splice(i + 1, 0, item);
            }
            else {
                console.log(item.id);
                if (i === (this.cartItems.length - 1)) {
                    this.cartItems.push(item);
                    this.service.addItem(1, item.id, i, 10);
                }
                else
                    this.cartItems.splice(i + 1, 0, item);
            }
            if (!this.isMove)
                this.dragItem = null;
        }
    };
    PlayList.prototype.toCart = function (item) {
        if (item) {
            this.cartItems.push(item);
            var spacer = new service_1.Asset();
            spacer.spacer = true;
        }
    };
    PlayList.prototype.offCart = function (item) {
        if (item) {
            var index = this.cartItems.indexOf(item);
            console.log("offcart" + index);
            if (index > -1) {
                this.cartItems.splice(index, 1);
            }
        }
    };
    PlayList.prototype.onCartDragItemStart = function (item) {
        this.isMove = true;
        this.dragMove = item;
        this.dragItem = item;
    };
    PlayList.prototype.onCartDragItemEnd = function (evt, item) {
        if (this.isMove && evt.y > 300)
            this.offCart(item);
        this.isMove = false;
        this.dragMove = null;
        this.dragItem = null;
    };
    PlayList = __decorate([
        core_1.Component({
            selector: 'play-list',
            template: "\n               <div class =\"panel panel-default\">\n               <div class =\"panel-heading\">\n                   <div class = \"cart\" (dragleave)=\"onDragOut($event)\">\n                       <div class=\"item\" *ngFor=\"let item of cartItems\" layout=\"row\" (dragstart)=\"onCartDragItemStart(item)\" (dragend)=\"onCartDragItemEnd($event, item)\">\n                                <img src=\" {{ item.img }} \" width=\"128\">\n                            <div class=\"spacer\" (dragenter)=\"onSpacerDragEnter(item)\">\n                            \n                            </div>\n                       </div>\n                   </div>\n               </div>\n               <div class=\"panel-body\">\n                     <md-content>\n                         <div class=\"card\" *ngFor=\"let item of data\">\n                            <md-card>\n                                      <img md-card-sm-image src=\" {{ item.thumb }} \" (dragstart)=\"onDragStart(item)\" (click)=\"onClickItem(item)\">\n                            </md-card>\n                         </div>\n                     </md-content>\n                     <div class=\"full-image\" *ngIf=\"fullItem\"> \n                         <img src=\" {{ fullItem.img }} \" width=\"200\" (click)=\"hideFullImage()\">\n                     </div>\n               </div>\n               </div>\n                ",
            styleUrls: ['app/assets/main.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [service_1.PlayListService]
        }), 
        __metadata('design:paramtypes', [service_1.PlayListService])
    ], PlayList);
    return PlayList;
}());
exports.PlayList = PlayList;
//# sourceMappingURL=play-list.js.map