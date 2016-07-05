/// <reference path="../typings/express/express.d.ts" />
"use strict";
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
        var storage = this.multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, SERVER + '/uploads/' + file.fieldname);
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
                // console.log(req.file);
                //console.log('fileReq ', this.fileReq);
                _this.onFileUploaded();
                deferred.resolve(_this.fileReq);
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
                // console.log('file size: ' + stats["size"]);
                deferred.resolve(stats["size"]);
            }
        });
        return deferred.promise;
    };
    FileProcessing.prototype.moveFile = function (thumbnailPath, originaImagePath, filename) {
        var _this = this;
        var deferred = Q.defer();
        // var newPathThumb:string = this.path.resolve(__dirname + this.pathDestC + 'thumbnails/' + originaImagelName);
        // var newOriginaImagelPath:string = this.path.resolve(__dirname + this.pathDestC + 'userImages/' + originaImagelName);
        this.newPathThumb = this.pathDestC + 'thumbnails/' + filename;
        this.newOriginaImagelPath = this.pathDestC + 'userImages/' + filename;
        // console.log('newPathThumb ', newPathThumb);
        // console.log('newOriginalPath ', newOriginaImagelPath);
        this.fs.rename(thumbnailPath, this.newPathThumb, function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                _this.fs.rename(originaImagePath, _this.newOriginaImagelPath, function (err) {
                    deferred.resolve([_this.newPathThumb, _this.newOriginaImagelPath]);
                });
            }
        });
        return deferred.promise;
    };
    FileProcessing.prototype.deleteFile = function (thumbnailPath, originaImagePath) {
        var _this = this;
        var deferred = Q.defer();
        this.fs.unlink(thumbnailPath, function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                _this.fs.unlink(originaImagePath, function (err) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve();
                    }
                });
            }
        });
        return deferred.promise;
    };
    return FileProcessing;
}());
exports.FileProcessing = FileProcessing;
//# sourceMappingURL=fileProcessing.js.map