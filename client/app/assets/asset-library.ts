/**
 * Created by Dmitriy Prilutsky on 14.07.2016.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AssetsService, Asset } from '../services/assets-service';


@Component({
    selector: 'asset-library',
    template: `<div class="asset-library">
                     <md-content>
                         <div class="card" *ngFor="let item of data">
                            <md-card>
                                      <img md-card-sm-image src=" {{ item.thumb }} " (click)="onClickItem(item)">
                            </md-card>
                         </div>
                     </md-content>
                     <div class="full-image" *ngIf="fullItem"> 
                         <img src=" {{ fullItem.img }} " width="200" (click)="hideFullImage()">
                     </div>
               </div>
                `,
    styles: [`
                .card {
                    height: 128px;
                    width: 128px;
                    float: left;
                }
            `],
    directives: [ROUTER_DIRECTIVES],
    providers: [AssetsService]
})


export class AssetLibrary {
    errorMessage:string;
    data:Asset[];
    cartItems:Asset[];
    dragItem:Asset;
    fullItem:Asset;
    dragMove:Asset;

    constructor(private service:AssetsService) {
        this.cartItems = [new Asset()];
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.service.getData()
            .subscribe(
                data => this.data = data,
                error => this.errorMessage = <any>error);
        {
        }
    }

    onClickItem(item:Asset) {
        this.fullItem = item;
    }

    hideFullImage() {
        this.fullItem = null;
    }
}