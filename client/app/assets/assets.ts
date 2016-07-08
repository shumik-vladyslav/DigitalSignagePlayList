import { Component } from '@angular/core';
import { AssetsService, Asset } from '../services/assets-service';

import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';


@Component({
    selector: 'assets-app',
    template: `
               <div class ="panel panel-default">          
   
               <div class="panel-body wrapper">
                     <md-content  class="content container">                   
                         <md-card *ngFor="let item of items" class="card" [dragula]='"bag-one"' [dragulaModel]='items'>
                                  <img src=" {{ item.thumb }} ">
                         </md-card>
                     
                     </md-content>
               </div>
               </div>
                `,
    styleUrls: ['app/assets/main.css'],
    directives: [Dragula],
    viewProviders: [DragulaService],
    providers: [AssetsService]
})

export class AssetsComponent {
    errorMessage: string;
    items: Asset[];

    constructor ( private service: AssetsService ) {

    }

    ngOnInit () {
        this.getData();
    }

    getData() {
        this.service.getData()
            .subscribe(
                data => this.items = data,
                error =>  this.errorMessage = <any>error);{
        }
    }
}
