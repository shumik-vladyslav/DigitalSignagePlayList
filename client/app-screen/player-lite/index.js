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
 * Created by Vlad on 7/16/2016.
 */
var core_1 = require("@angular/core");
var player_service_1 = require("../services/player.service");
var PlayerLite = (function () {
    function PlayerLite(service) {
        this.service = service;
    }
    PlayerLite.prototype.ngOnInit = function () {
        console.log(this.playervo);
        this.screenid = PlayerVO.screenid;
        // this.service.getPlaylist(this.playerid).subscribe(data=>this._data=data, err=>this._error = err);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', PlayerVO)
    ], PlayerLite.prototype, "playervo", void 0);
    PlayerLite = __decorate([
        core_1.Component({
            selector: 'player-lite',
            template: "\n        <h2>Player Lite id {{playervo.id}}</h2>       \n         <h2>Screen {{screenid}}</h2>       \n    ",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], PlayerLite);
    return PlayerLite;
}());
exports.PlayerLite = PlayerLite;
var PlayerVO = (function () {
    function PlayerVO(obj) {
        for (var str in obj)
            this[str] = obj[str];
    }
    return PlayerVO;
}());
exports.PlayerVO = PlayerVO;
//# sourceMappingURL=index.js.map