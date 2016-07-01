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
var icon_list_1 = require('./icon-list');
var icon_1 = require('./icon');
var IconPanel = (function () {
    function IconPanel() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', icon_1.Icon)
    ], IconPanel.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], IconPanel.prototype, "icons", void 0);
    IconPanel = __decorate([
        core_1.Component({
            selector: 'icon-panel',
            templateUrl: './icon-panel.html',
            styleUrls: ['./icon-panel.css'],
            directives: [icon_list_1.IconList]
        }), 
        __metadata('design:paramtypes', [])
    ], IconPanel);
    return IconPanel;
}());
exports.IconPanel = IconPanel;
//# sourceMappingURL=icon-panel.js.map