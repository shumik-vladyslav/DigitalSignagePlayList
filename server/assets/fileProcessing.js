/// <reference path="../typings/express/express.d.ts" />
"use strict";
// import fs = require ('fs');
// import path = require('path');
// import Jimp = require("jimp");
var Q = require('q');
var multer = require("multer");
var FileProcessing = (function () {
    function FileProcessing() {
        this.fs = require('fs');
        this.path = require('path');
        this.multer = require('multer');
        this.pathDestC = WWW + '/clientAssets/uploads/';
    }
    FileProcessing.prototype.onFileUploaded = function () {
        var _this = this;
        this.fs.stat(this.fileReq.path, function (err, stats) {
            if (err) {
                _this.deffered.reject(err);
            }
            else {
                if (_this.fileReq.size === stats["size"]) {
                    _this.deffered.resolve(_this.fileReq);
                }
                else {
                    _this.deffered.reject(stats);
                }
            }
        });
    };
    FileProcessing.prototype.startProces = function (req, res) {
        var _this = this;
        var deferred = Q.defer();
        this.deffered = deferred;
        // this.fileReq = req.file;
        //
        // console.log(req.file);
        // console.log(this.fileReq);
        var storage = this.multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, __dirname + '/../uploads/' + file.fieldname);
            },
            filename: function (req, file, callback) {
                callback(null, '_' + Date.now() + '_' + file.originalname);
            }
        });
        var upload = multer({ storage: storage }).single('userImages');
        upload(req, res, function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                _this.fileReq = req.file;
                console.log(req.file);
                console.log(_this.fileReq);
                _this.onFileUploaded();
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    FileProcessing.prototype.checkFileSize = function (filePath) {
        var deferred = Q.defer();
        this.fs.stat(filePath, function (err, stats) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log('file size: ' + stats["size"]);
                deferred.resolve(stats["size"]);
            }
        });
        return deferred.promise;
    };
    FileProcessing.prototype.moveFile = function (thumbnailPath, originaImagePath, originaImagelName) {
        var _this = this;
        var deferred = Q.defer();
        // oldPath:string =
        // var newPathThumb:string = this.path.resolve(__dirname + this.pathDestC + 'thumbnails/' + originaImagelName);
        // var newOriginaImagelPath:string = this.path.resolve(__dirname + this.pathDestC + 'userImages/' + originaImagelName);
        var newPathThumb = this.pathDestC + 'thumbnails/' + originaImagelName;
        var newOriginaImagelPath = this.pathDestC + 'userImages/' + originaImagelName;
        console.log('newPathThumb ', newPathThumb);
        console.log('newOriginalPath ', newOriginaImagelPath);
        this.fs.rename(thumbnailPath, newPathThumb, function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                _this.fs.rename(originaImagePath, newOriginaImagelPath, function (err) {
                    deferred.resolve([newPathThumb, newOriginaImagelPath]);
                });
            }
        });
        return deferred.promise;
    };
    return FileProcessing;
}());
exports.FileProcessing = FileProcessing;
//# sourceMappingURL=fileProcessing.js.map