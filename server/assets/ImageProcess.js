/// <reference path="../typings/express/express.d.ts" />
"use strict";
var Q = require('q');
// import Jimp from 'jimp';
// export interface IJimpImage {
//     _originalMime: string;
//     bitmap:{
//         data:Buffer,
//         width:number,
//         height:number
//     }
// }
var ImageProcess = (function () {
    function ImageProcess() {
        this.path = require('path');
        this.Jimp = require("jimp");
        this.folder = '/../uploads/thumbnails/';
        this.thumbSize = 128;
    }
    ImageProcess.prototype.getImagePath = function () {
        return this.pathDest;
    };
    ImageProcess.prototype.resizeImage = function () {
        this.isLandScape = this.image.bitmap.height < this.image.bitmap.width;
        var p = this.isLandScape ? this.image.resize(this.Jimp.AUTO, this.thumbSize) :
            this.image.resize(this.thumbSize, this.Jimp.AUTO);
        var x = 0;
        var y = 0;
        if (this.isLandScape) {
            x = (this.image.bitmap.width - this.thumbSize) / 2;
            console.log('this.image.bitmap.width = ', this.image.bitmap.width);
            console.log('x = ', x);
        }
        else {
            y = (this.image.bitmap.height - this.thumbSize) / 2;
            console.log('this.image.bitmap.height = ', this.image.bitmap.height);
            console.log('y = ', y);
        }
        //p.quality(80)
        p.crop(x, y, this.thumbSize, this.thumbSize)
            .write(this.pathDest);
        // .catch(function (err) {
        //     console.log(err);
        //     this.deferred.reject(err);
        // });
        this.deffered.resolve(this.pathDest);
    };
    ImageProcess.prototype.readImage = function (filePath) {
        var _this = this;
        this.Jimp.read(filePath).then(function (image) {
            // console.log(__dirname + pathDest + '_small_' + fileOriginalname);
            _this.image = image;
            // console.log('image', this.image);
            _this.resizeImage();
            // var height = image.bitmap.height;
            // var width = image.bitmap.width;
        }).catch(function (err) {
            console.log(err);
            this.deferred.reject(err);
        });
    };
    ImageProcess.prototype.makeThumbnail = function (filePath, fileOriginalname) {
        var deferred = Q.defer();
        this.deffered = deferred;
        this.pathDest = this.path.resolve(__dirname + this.folder + fileOriginalname);
        this.fileOriginalname = fileOriginalname;
        console.log('makeThumbnail pathDest\n', this.pathDest);
        this.readImage(filePath);
        // this.Jimp.read(filePath).then((image)=> {
        //     console.log(__dirname + pathDest + '_small_' + fileOriginalname);
        //     var height = image.bitmap.height;
        //     var width = image.bitmap.width;
        //
        //
        //     image.resize(128, 128).write(__dirname + pathDest + '_small_' + fileOriginalname);
        //     deferred.resolve(__dirname + pathDest + '_small_' + fileOriginalname);
        // }).catch(function (err) {
        //     console.log(err);
        //     deferred.reject(err);
        // });
        return deferred.promise;
    };
    return ImageProcess;
}());
exports.ImageProcess = ImageProcess;
//# sourceMappingURL=ImageProcess.js.map