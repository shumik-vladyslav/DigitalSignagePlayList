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
/**
 * Created by Vlad on 7/5/2016.
 */
const core_1 = require('@angular/core');
const http_1 = require("@angular/http");
let TableObject = class TableObject {
    constructor(http) {
        this.http = http;
        this.title = 'Data ';
        // private data:string[][];
        this.heads = [];
    }
    onClick(row) {
        console.log(row);
    }
    onNameClick(row) {
        console.log(row);
    }
};
__decorate([
    core_1.Input('thedata'), 
    __metadata('design:type', Array)
], TableObject.prototype, "data", void 0);
TableObject = __decorate([
    core_1.Component({
        selector: 'table-object',
        template: `<h3>{{title}}</h3>
    <table class="table table-default">
    <thead>
        <tr>
            <td >id</td>
            <td >Name</td>
            <td >State</td>
            <td >time</td>
        </tr>
    </thead>
    <tbody>
        <tr (click)="onClick(row)" *ngFor="let row of data" >
            <td>{{row.id}}</td>
            <td (click)="onNameClick(row.name)" >{{row.name}}</td>
            <td>
            <md-card>
                   <md-card-title-group>
                      <img md-card-sm-image src="css/{{row.state}}.png">
                      <md-card-title>Card with title</md-card-title>
                      <md-card-subtitle>Subtitle</md-card-subtitle>
                   </md-card-title-group>
                </md-card>           
            </td>
            <td>{{row.time}}</td>
        </tr>
    </tbody>
    </table>`,
        providers: [http_1.HTTP_PROVIDERS]
    }), 
    __metadata('design:paramtypes', [http_1.Http])
], TableObject);
exports.TableObject = TableObject;
//# sourceMappingURL=TableObject.js.map