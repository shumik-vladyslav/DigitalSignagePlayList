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
                         <md-card layout="column">
                                  <img md-card-sm-image src=" {{ item.thumb }} ">
                         </md-card>
                     </div>
                     </md-content>
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

    constructor ( private service: AssetsService ) {

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
}
