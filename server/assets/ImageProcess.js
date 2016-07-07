"use strict";
var Q = require('q');
var ImageProcess = (function () {
    function ImageProcess() {
        this.path = require('path');
        this.Jimp = require("jimp");
        this.thumbSize = 128;
        this.deferred = Q.defer();
        this.tempFolder = SERVER + '/uploads/thumbnails/';
    }
    ImageProcess.prototype.onError = function (err) {
        this.deferred.reject(err);
    };
    ImageProcess.prototype.onSuccess = function (result) {
        this.deferred.resolve(result);
    };
    ImageProcess.prototype.resizeImage = function () {
        var _this = this;
        this.widthImage = this.image.bitmap.width;
        this.heightImage = this.image.bitmap.height;
        try {
            this.isLandScape = this.image.bitmap.height < this.image.bitmap.width;
            var p = this.isLandScape ? this.image.resize(this.Jimp.AUTO, this.thumbSize) :
                this.image.resize(this.thumbSize, this.Jimp.AUTO);
        }
        catch (e) {
            this.onError(e);
            return;
        }
        var x = 0;
        var y = 0;
        if (this.isLandScape) {
            x = (this.image.bitmap.width - this.thumbSize) / 2;
        }
        else {
            y = (this.image.bitmap.height - this.thumbSize) / 2;
        }
        p.write(this.pathDest, function (err) {
            if (err)
                _this.onError(err);
            else
                _this.onSuccess(_this.pathDest);
        });
    };
    ImageProcess.prototype.readImage = function (filePath) {
        var _this = this;
        this.Jimp.read(filePath).then(function (image) {
            _this.image = image;
            _this.resizeImage();
        }).catch(function (err) {
            console.log(err);
            this.onError(err);
        });
    };
    ImageProcess.prototype.makeThumbnail = function (filePath, filename) {
        this.pathDest = this.tempFolder + filename;
        this.filename = filename;
        this.readImage(filePath);
        return this.deferred.promise;
    };
    return ImageProcess;
}());
exports.ImageProcess = ImageProcess;
//# sourceMappingURL=ImageProcess.js.map