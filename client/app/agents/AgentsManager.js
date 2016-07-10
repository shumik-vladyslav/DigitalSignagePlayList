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
 * Created by Vlad on 7/6/2016.
 */
const core_1 = require('@angular/core');
const MyTable_1 = require("../table/MyTable");
const http_1 = require("@angular/http");
let AgentsManager = class AgentsManager {
    constructor(http) {
        this.http = http;
        this.myurl = '';
        this.title = 'Agents Header';
        http.get("http://front-desk.ca/tableblue/agents/getagents.php")
            .subscribe((data) => {
            var head = [];
            var ar = [];
            var i = 0;
            data.json().list.forEach(function (item) {
                var row = [];
                if (i++ === 0)
                    for (var str in item)
                        head.push(str);
                for (var str in item)
                    row.push(item[str]);
                ar.push(row);
            });
            console.log(ar);
            this.myheads = head;
            this.mydata = ar;
        });
    }
};
AgentsManager = __decorate([
    core_1.Component({
        selector: 'agents',
        template: `
    <h1 class="title">Agents</h1>
    <div class="panel panel-default">
      <div></div>
      <div class="panel-body">
      <table-simple [thedata]="mydata" [theheader]="myheads"></table-simple>
      </div>      
    </div>      
    `,
        directives: [MyTable_1.TableComponent]
    }), 
    __metadata('design:paramtypes', [http_1.Http])
], AgentsManager);
exports.AgentsManager = AgentsManager;
//# sourceMappingURL=AgentsManager.js.map