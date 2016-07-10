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
        this.cart = [];
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
    showFullImage(item) {
        item.full = item;
    }
    hideFullImage(item) {
        item.full = '';
    }
    onDragEnd(event, item) {
        console.log(event);
    }
    toCard(item) {
        this.cart.push(item);
    }
    dropCard(item) {
        if (item) {
            let index = this.cart.indexOf(item);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        }
    }
};
AssetsMain = __decorate([
    core_1.Component({
        selector: 'assets-app',
        template: `
               <div class ="panel panel-default">
               <div class ="panel-heading">
                   <div class = "cart">
                       <div class="item" *ngFor="let item of cart" layout="row">
                                <img src=" {{ item.img }} " width="128" (dragend)="dropCard(item)">
                       </div>
                   </div>
               </div>
               <div class="panel-body">
                     <md-content>
         
                     <div class="card" *ngFor="let item of data">
                        <md-card>
                                  <img md-card-sm-image src=" {{ item.thumb }} " (click)="showFullImage(item)" (dragend)="onDragEnd($event, item)">
                        </md-card>
                        <div *ngIf="item.full"> 
                           <img src=" {{ item.img }} " width="200" (click)="hideFullImage(item)">
                        </div>
                     </div>
                     </md-content>
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
//# sourceMappingURL=assets-old.js.map