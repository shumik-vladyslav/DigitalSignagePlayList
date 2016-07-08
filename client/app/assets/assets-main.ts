import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AssetsService, Asset } from '../services/assets-service';


@Component({
    selector: 'assets-app',
    template: `
               <div class ="panel panel-default">
               <div class="panel-body">
                     <md-content layout="row">
                     <div *ngFor="let item of data">
                        <md-card>
                                  <img md-card-sm-image src=" {{ item.thumb }} " (click)="showFullImage(item)" (dragend)="toCard(item)">
                        </md-card>
                        <div *ngIf="item.full"> 
                           <img src=" {{ item.img }} " width="200" (click)="hideFullImage(item)">
                        </div>
                     </div>
                     </md-content>
               </div>
               <div class = "cart" *ngFor="let item of cart"> 
                    <img src=" {{ item.img }} " width="200" (dragend)="dropCard(item)">
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
    cart: Asset[];

    constructor ( private service: AssetsService ) {
        this.cart =[];
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

    showFullImage (item) {
        item.full = item;
    }

    hideFullImage (item) {
        item.full ='';
    }

    toCard (item) {
        this.cart.push(item);
    }

    dropCard (item) {
        if (item) {
            let index = this.cart.indexOf(item);
            if (index > -1) {
                this.cart.splice(index,1);
            }
        }
    }
}