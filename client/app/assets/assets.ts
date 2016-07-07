import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AssetsService, Asset } from '../services/assets-service';


@Component({
    selector: 'assets-app',
    template: `
               <div class ="panel panel-default">
               <div class="panel-body">
                     <md-content  class="content">                   
                         <md-card *ngFor="let item of data" class="card">
                                  <img src=" {{ item.thumb }} ">
                         </md-card>
                     
                     </md-content>
               </div>
               </div>
                `,
    //styleUrls: ['app/assets/main.css'],
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

export class AssetsComponent {
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
