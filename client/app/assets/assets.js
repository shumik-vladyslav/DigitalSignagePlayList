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
var router_1 = require('@angular/router');
var icon_panel_1 = require('./icon-panel');
var icon_list_1 = require('./icon-list');
var AssetsComponent = (function () {
    function AssetsComponent() {
        this.icons = [];
    }
    AssetsComponent.prototype.onMessagesAdded = function (icon) {
        this.icons.push(icon);
    };
    AssetsComponent = __decorate([
        core_1.Component({
            selector: 'assets-app',
            templateUrl: 'app/assets/assets.html',
            styleUrls: ['app/assets/assets.css'],
            directives: [icon_panel_1.IconPanel, icon_list_1.IconList, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AssetsComponent);
    return AssetsComponent;
}());
exports.AssetsComponent = AssetsComponent;
//# sourceMappingURL=assets.js.map