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
 * Created by Vlad on 7/12/2016.
 */
var core_1 = require('@angular/core');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var UploadFiles = (function () {
    function UploadFiles() {
        this.uploadProgresses = [];
        this.options = {
            url: 'http://localhost:8888/api/assets/upload'
        };
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    UploadFiles.prototype.handleUpload = function (data) {
        var _this = this;
        console.log(data);
        var id = data.id;
        var index = this.findIndex(id);
        if (index === -1) {
            this.uploadProgresses.push({ id: id, percent: 0, originalName: data.originalName });
        }
        if (this.uploadProgresses[index]) {
            this.zone.run(function () {
                _this.uploadProgresses[index].percent = data.progress.percent;
            });
        }
    };
    UploadFiles.prototype.findIndex = function (id) {
        return this.uploadProgresses.findIndex(function (x) { return x.id === id; });
    };
    UploadFiles = __decorate([
        core_1.Component({
            selector: 'multiple-progressbar',
            templateUrl: 'app/assets/multiple-progressbar.html',
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
            styles: ["\n.olive{\nbackground-color: olive;\n}\n.bar{\nheight: 30px;\nbackground-color: red;\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], UploadFiles);
    return UploadFiles;
}());
exports.UploadFiles = UploadFiles;
//# sourceMappingURL=UploadFiles.js.map