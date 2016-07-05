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
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var MyTrComponent = (function () {
    function MyTrComponent() {
    }
    MyTrComponent.prototype.onClick = function (col) {
        console.log(this);
    };
    MyTrComponent.prototype.ngOnInit = function () {
        console.log(this);
    };
    __decorate([
        core_1.Input('myTr'), 
        __metadata('design:type', Object)
    ], MyTrComponent.prototype, "row", void 0);
    MyTrComponent = __decorate([
        core_1.Component({
            selector: '[myTr]',
            template: "<td (click)=\"onClick(val)\"   *ngFor=\"let val of row\"  >{{val}}</td>"
        }), 
        __metadata('design:paramtypes', [])
    ], MyTrComponent);
    return MyTrComponent;
}());
exports.MyTrComponent = MyTrComponent;
var AppComponent2 = (function () {
    function AppComponent2(http) {
        var _this = this;
        this.http = http;
        this.title = "Angular 2 - tr attribute selector";
        http.get("http://front-desk.ca/tableblue/agents/getagents.php")
            .subscribe(function (data) {
            var ar = [];
            data.json().list.forEach(function (item) {
                var row = [];
                for (var str in item)
                    row.push(item[str]);
                ar.push(row);
            });
            console.log(data);
            _this.data = ar;
        });
    }
    AppComponent2.prototype.onClick = function (col) {
        console.log(col);
    };
    AppComponent2 = __decorate([
        core_1.Component({
            selector: 'div',
            template: "{{title}}\n    <table>\n    <tr *ngFor=\"let line of data\" [myTr]=\"line\"></tr>\n    </table>",
            providers: [http_1.HTTP_PROVIDERS],
            directives: [MyTrComponent]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent2);
    return AppComponent2;
}());
exports.AppComponent2 = AppComponent2;
//# sourceMappingURL=MyTable.js.map