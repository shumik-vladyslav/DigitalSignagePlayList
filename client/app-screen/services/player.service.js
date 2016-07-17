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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
    }
    PlayerService.prototype.getPlaylist = function (playlistid) {
        this.playlistId = playlistid;
        return this.loadData();
    };
    PlayerService.prototype.loadData = function () {
        var _this = this;
        return this.http.get('api/get-playlist/' + this.playlistId)
            .map(function (data) { return _this.parse(data); })
            .catch(this.handleError);
    };
    PlayerService.prototype.parse = function (data) {
        var out = [];
        return out;
    };
    PlayerService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
var PlaylistItem = (function () {
    function PlaylistItem() {
    }
    return PlaylistItem;
}());
exports.PlaylistItem = PlaylistItem;
//# sourceMappingURL=player.service.js.map