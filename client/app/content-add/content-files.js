"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Vlad on 7/12/2016.
 */
var core_1 = require('@angular/core');
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var FileContent = (function () {
    function FileContent(zone, router) {
        this.zone = zone;
        this.router = router;
        this.showtools = "show";
        this.uploadProgresses = [];
        // zone: NgZone;
        this.options = {
            url: 'http://localhost:56777/proxy/api/assets/upload'
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
            template: "\n              <div class=\"wraper\">\n                <div class=\"wraper-tools {{ showtools }}\">\n                    <div class=\"btn btn-default upload-button\">\n    \n                        <label for=\"files-pb\" class=\"ui small black button icon\">\n                            <span class=\"ion-document-text icon\"></span>\n                            Browse\n                        </label>\n    \n                        <input type=\"file\"\n                               id=\"files-pb\"\n                               style=\"display:none;\"\n                               [ng-file-select]=\"options\"\n                               name=\"userImages\"\n                               (onUpload)=\"handleUpload($event)\"\n                               multiple>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n                </div>\n                <div class=\"progress-container {{ showprogress }}\">\n                    <div class=\"progress-window\">\n                        <div *ngFor=\"let progressObj of uploadProgresses\">\n                            <div>{{progressObj.originalName}}</div>\n                            <div class=\"ui indicating olive progress\">\n                                <div class=\"bar\" [style.width]=\"progressObj.percent + '%'\"></div>\n                                <div class=\"label\">Uploading file ({{ progressObj.percent }}%)</div>\n                            </div>\n                        </div>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Cancel</button>\n                </div>\n              </div>\n                 \n             ",
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
            styles: ["\n               \n            .wraper-tools {\n                position: absolute;\n                bottom: 20px;\n                right: 20px;\n            }\n            \n            .progress-window {\n                height: 250px;\n                overflow-y: auto;\n            }\n                        \n            .olive {\n                height: 10px;\n                background-color: olive;\n            }\n            \n            .bar{\n                height: 10px;\n                background-color: red;\n            }\n    "]
        })
    ], FileContent);
    return FileContent;
}());
exports.FileContent = FileContent;
//# sourceMappingURL=content-files.js.map