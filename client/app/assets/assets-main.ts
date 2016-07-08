import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AssetsService, Asset } from '../services/assets-service';


@Component({
    selector: 'assets-app',
    template: `
               <div class ="panel panel-default">
               <div class ="panel-heading">
                   <div class = "cart" (dragenter)="onDragEnter($event)" (dragleave)="onDragOut($event)">
                       <div class="item" *ngFor="let item of cartItems" layout="row">
                                <img src=" {{ item.img }} " width="128" (dragend)="dropCard(item)">
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
    directives: [ROUTER_DIRECTIVES],
    providers: [AssetsService]
})

export class AssetsMain {
    errorMessage: string;
    data: Asset[];
    cartItems: Asset[];
    dragItem: Asset;
    fullItem: Asset;

    constructor ( private service: AssetsService ) {
        this.cartItems =[];
    }

    ngOnInit () {
        this.getData();
    }

    getData() {
        this.service.getData()
            .subscribe(
                data => this.data = data,
                error =>  this.errorMessage = <any>error);{
        }
    }

    onClickItem (item: Asset) {
        this.fullItem = item;
    }

    hideFullImage () {
        this.fullItem = null;
    }

    onDragEnd (evt:DragEvent) {
        this.dragItem = null;
    }

    onDragEnter (evt:DragEvent) {
        this.toCart (this.dragItem);
        this.dragItem = null;
    }


    onDragStart (item: Asset) {
        this.dragItem = item;
    }

    onDragOut (evt) {
        this.offCart(this.dragItem);
    }

    toCart (item) {
        if (item) this.cartItems.push(item);
    }

    offCart (item) {
        if (item) {
            let index = this.cartItems.indexOf(item);
            console.log(index);
            if (index > -1) {
                this.cartItems.splice(index,1);
            }
        }
    }
}