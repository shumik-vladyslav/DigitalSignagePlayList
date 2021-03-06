import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { PlayListService, Asset } from './service';


@Component({
    selector: 'play-list',
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
                     <div class="full-image" *ngIf="fullItem"> 
                         <img src=" {{ fullItem.img }} " width="200" (click)="hideFullImage()">
                     </div>
               </div>
               </div>
                `,
    styleUrls: ['app/assets/main.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [PlayListService]
})

export class PlayList {
    errorMessage: string;
    data: Asset[];
    cartItems: Asset[];
    dragItem: Asset;
    fullItem: Asset;
    dragMove: Asset;

    constructor ( private service: PlayListService ) {
        this.cartItems =[new Asset()];
    }

    ngOnInit () {
        this.getData();
    }

    getData() {

        this.service.getData()
            .subscribe(
                data => this.data = data,
                error =>  this.errorMessage = <any>error);

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
    }


    onDragStart (item: Asset) {
        this.isMove = false;
        this.dragItem = item;
    }

    onDragOut (evt) {
        if (!this.isMove) this.offCart(this.dragItem);
    }

    onSpacerDragEnter (item: Asset) {
        let i:number = this.cartItems.indexOf(item);
        this.insertToCardAt(this.dragItem, i)
    }

    insertToCardAt (item: Asset, i:number) {
        console.log(item, i, this.isMove);
        if (item && i !== -1) {
            if (this.isMove) {
                console.log(22)

                let index:number = this.cartItems.indexOf(item);
                if (index > -1) {
                    this.cartItems.splice(index,1);
                }
                this.cartItems.splice(i + 1, 0, item);
            }
            else {
                if (i === (this.cartItems.length - 1) ){
                    this.cartItems.push(item);
                    this.service.addItem(1, item.id, i, 10).subscribe(
                        (res)=>{
                            console.log(res);
                        },
                        error =>  this.errorMessage = <any>error);
                }
                else this.cartItems.splice(i + 1, 0, item);

            }
            if (!this.isMove) this.dragItem = null;

        }
    }

    toCart (item) {
        if (item) {
            this.cartItems.push(item);
            let spacer = new Asset ();
            spacer.spacer = true;
/*            this.cartItems.push(spacer);*/
        }
    }

    offCart (item) {
        if (item) {
            let index:number = this.cartItems.indexOf(item);
            console.log("offcart" + index);
            if (index > -1) {
                this.cartItems.splice(index,1);
            }
        }
    }

    isMove:boolean;

    onCartDragItemStart (item: Asset) {
        this.isMove = true;
        this.dragMove = item;
        this.dragItem = item;
    }

    onCartDragItemEnd (evt, item: Asset) {
        if (this.isMove && evt.y > 300) this.offCart (item);
        this.isMove = false;
        this.dragMove = null;
        this.dragItem = null;
    }
}