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
var core_1 = require('@angular/core');
var assets_service_1 = require('../services/assets-service');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var AssetsComponent = (function () {
    function AssetsComponent(service) {
        this.service = service;
    }
    AssetsComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    AssetsComponent.prototype.getData = function () {
        var _this = this;
        this.service.getData()
            .subscribe(function (data) { return _this.data = data; }, function (error) { return _this.errorMessage = error; });
        {
        }
    };
    AssetsComponent = __decorate([
        core_1.Component({
            selector: 'assets-app',
            template: "\n               <div class =\"panel panel-default\">\n               <div class=\"panel-body\">\n                     <md-content  class=\"content\">                   \n                         <md-card *ngFor=\"let item of data\" class=\"card\">\n                                  <img src=\" {{ item.thumb }} \">\n                         </md-card>\n                     \n                     </md-content>\n               </div>\n               </div>\n                ",
            //styleUrls: ['app/assets/main.css'],
            styles: ["\n        .card {\n          height: 128px;\n          width: 128px;\n          float: left;\n        }\n    "],
            directives: [ng2_dragula_1.Dragula],
            providers: [assets_service_1.AssetsService]
        }), 
        __metadata('design:paramtypes', [assets_service_1.AssetsService])
    ], AssetsComponent);
    return AssetsComponent;
}());
exports.AssetsComponent = AssetsComponent;
//# sourceMappingURL=assets.js.map