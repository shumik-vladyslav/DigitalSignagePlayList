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
var router_1 = require('@angular/router');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var FileContent = (function () {
    function FileContent(zone, router) {
        this.zone = zone;
        this.router = router;
        this.uploadProgresses = [];
        // zone: NgZone;
        this.options = {
            url: 'http://localhost:8888/api/assets/upload'
        };
        // this.zone = new NgZone({ enableLongStackTrace: false });
    }
    FileContent.prototype.handleUpload = function (data) {
        var _this = this;
        // console.log(data);
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
    FileContent.prototype.findIndex = function (id) {
        return this.uploadProgresses.findIndex(function (x) { return x.id === id; });
    };
    FileContent.prototype.goBack = function () {
        var link = ['/content-manager'];
        this.router.navigate(link);
    };
    FileContent = __decorate([
        core_1.Component({
            selector: 'multiple-progressbar',
            template: "\n              <div class=\"wraper\">\n                <div>\n                    <br>\n                    <label for=\"files-pb\" class=\"ui small black button right icon upload-button\">\n                        <i class=\"ion-document-text icon\"></i>\n                        Browse\n                    </label>\n                    <br>\n                    <input type=\"file\"\n                           id=\"files-pb\"\n                           style=\"display:none;\"\n                           [ng-file-select]=\"options\"\n                           name=\"userImages\"\n                           (onUpload)=\"handleUpload($event)\"\n                           multiple>\n                </div>\n                <div class=\"ui divider\"></div>\n                <div *ngFor=\"let progressObj of uploadProgresses\">\n                    <div>{{progressObj.originalName}}</div>\n                    <div class=\"ui indicating olive progress\">\n                        <div class=\"bar\" [style.width]=\"progressObj.percent + '%'\"></div>\n                        <div class=\"label\">Uploading file ({{ progressObj.percent }}%)</div>\n                    </div>\n                </div>\n                <br>\n                <!--<button type=\"submit\" class=\"btn btn-default\">Upload</button>-->\n                <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n              </div>  \n             ",
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
            styles: ["\n            .wraper {\n                margin: 20px 20px;\n                width: 440px;\n                height: 350px;\n                position: relative;\n            }\n            .upload-button {\n                position: absolute;\n                top: 40%;\n                left: 42%;\n                color: #333;\n                background-color: #fff;\n                display: inline-block;\n                padding: 6px 12px;\n                font-size: 14px;\n                font-weight: 400;\n                line-height: 1.42857143;\n                text-align: center;\n                white-space: nowrap;\n                vertical-align: middle;\n                -ms-touch-action: manipulation;\n                touch-action: manipulation;\n                cursor: pointer;\n                -webkit-user-select: none;\n                -moz-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n                background-image: none;\n                border: 1px solid #ccc;\n                border-radius: 4px;\n                margin: auto auto;\n            }\n            \n            .upload-button:hover {\n                background-color: #e6e6e6;\n                border-color: #adadad;\n            }\n            \n            .btn {\n                position: absolute;\n                top: 90%;\n                left: 80%;\n            }\n            \n            .olive {\n                height: 10px;\n                background-color: olive;\n            }\n            \n            .bar{\n                height: 10px;\n                background-color: red;\n            }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, router_1.Router])
    ], FileContent);
    return FileContent;
}());
exports.FileContent = FileContent;
//# sourceMappingURL=content-files.js.map