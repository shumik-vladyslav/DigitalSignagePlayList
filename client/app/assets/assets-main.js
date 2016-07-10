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
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const assets_service_1 = require('../services/assets-service');
let AssetsMain = class AssetsMain {
    constructor(service) {
        this.service = service;
        this.cartItems = [new assets_service_1.Asset()];
    }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getData()
            .subscribe(data => this.data = data, error => this.errorMessage = error);
        {
        }
    }
    onClickItem(item) {
        this.fullItem = item;
    }
    hideFullImage() {
        this.fullItem = null;
    }
    onDragEnd(evt) {
        this.dragItem = null;
    }
    onDragEnter(evt) {
        this.toCart(this.dragItem);
    }
    onDragStart(item) {
        this.isMove = false;
        this.dragItem = item;
    }
    onDragOut(evt) {
        if (!this.isMove)
            this.offCart(this.dragItem);
    }
    onSpacerDragEnter(item) {
        let i = this.cartItems.indexOf(item);
        this.insertToCardAt(this.dragItem, i);
    }
    insertToCardAt(item, i) {
        console.log(item, i, this.isMove);
        if (item && i !== -1) {
            if (this.isMove) {
                let index = this.cartItems.indexOf(item);
                if (index > -1) {
                    this.cartItems.splice(index, 1);
                }
                this.cartItems.splice(i + 1, 0, item);
            }
            else {
                if (i === (this.cartItems.length - 1))
                    this.cartItems.push(item);
                else
                    this.cartItems.splice(i + 1, 0, item);
            }
            if (!this.isMove)
                this.dragItem = null;
        }
    }
    toCart(item) {
        if (item) {
            this.cartItems.push(item);
            let spacer = new assets_service_1.Asset();
            spacer.spacer = true;
        }
    }
    offCart(item) {
        if (item) {
            let index = this.cartItems.indexOf(item);
            console.log("offcart" + index);
            if (index > -1) {
                this.cartItems.splice(index, 1);
            }
        }
    }
    onCartDragItemStart(item) {
        this.isMove = true;
        this.dragMove = item;
        this.dragItem = item;
    }
    onCartDragItemEnd(evt, item) {
        if (this.isMove && evt.y > 300)
            this.offCart(item);
        this.isMove = false;
        this.dragMove = null;
        this.dragItem = null;
    }
};
AssetsMain = __decorate([
    core_1.Component({
        selector: 'assets-app',
        template: `
               <div class ="panel panel-default">
               <div class ="panel-heading">
                   <div class = "cart" (dragleave)="onDragOut($event)">
                       <div class="item" *ngFor="let item of cartItems" layout="row" (dragstart)="onCartDragItemStart(item)" (dragend)="onCartDragItemEnd($event, item)">
                                <img src=" {{ item.img }} " width="128">
                            <div class="spacer" (dragenter)="onSpacerDragEnter(item)">
                            
                            </div>
                       </div>
                   </div>
               </div>
               <div class="panel-body">
                     <md-content>
                         <div class="card" *ngFor="let item of data">
                            <md-card>
                                      <img md-card-sm-image src=" {{ item.thumb }} " (dragstart)="onDragStart(item)" (click)="onClickItem(item)">
                            </md-card>
                         </div>
                     </md-content>
                     <div class ="modal" *ngIf="fullItem"> 
                         <img src=" {{ fullItem.img }} " width="200" (click)="hideFullImage()">
                     </div>
               </div>
               </div>
                `,
        styleUrls: ['app/assets/main.css'],
        directives: [router_1.ROUTER_DIRECTIVES],
        providers: [assets_service_1.AssetsService]
    }), 
    __metadata('design:paramtypes', [assets_service_1.AssetsService])
], AssetsMain);
exports.AssetsMain = AssetsMain;
//# sourceMappingURL=assets-main.js.map