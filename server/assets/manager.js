"use strict";
var express = require('express');
var db = require("./dbAssets");
var dbAssets_1 = require("./dbAssets");
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var router = express.Router();
var mydb = new db.DBAssets();
var fs = require('fs');
mydb.createNewTable();
var IUplResult = (function () {
    function IUplResult() {
        this.result = {
            insertId: 0,
            thumbPath: '',
            imagePath: ''
        };
    }
    return IUplResult;
}());
var IError = (function () {
    function IError() {
    }
    return IError;
}());
router.post('/upload', function (req, res) {
    var fp = new fileProcessing_1.FileProcessing();
    var ip = new ImageProcess_1.ImageProcess();
    var onSuccess = function (result) {
        console.log('onSuccess result\n', result);
        result.success = "success";
        res.json(result);
    };
    var onError = function (err) {
        console.log('onError error\n', err);
        res.json({ error: 'error', reason: err });
    };
    var makeAsset = function () {
        var lenWWW = WWW.length;
        var asset = new dbAssets_1.Assets();
        asset.originalName = fp.fileReq.originalname;
        asset.mime = fp.fileReq.mimetype;
        asset.size = fp.fileReq.size;
        asset.width = ip.widthImage;
        asset.height = ip.heightImage;
        asset.thumb = fp.newPathThumb;
        asset.path = fp.newOriginaImagelPath;
        asset.thumb = asset.thumb.substr(lenWWW);
        asset.path = asset.path.substr(lenWWW);
        return asset;
    };
    var insertInDB = function () {
        var a = makeAsset();
        var promise = mydb.insertContent(a);
        promise.then(function (result) {
            var out = new IUplResult();
            out.result.insertId = result.id;
            out.result.thumbPath = a.thumb;
            out.result.imagePath = a.path;
            onSuccess(out);
        }, function (err) {
            console.log(err);
            fp.deleteFile(fp.newPathThumb, fp.newOriginaImagelPath);
            onError(err);
        });
    };
    var processImage = function () {
        var details = fp.fileReq;
        ip.makeThumbnail(details.path, details.filename).then(function (thumbnailPath) {
            fp.moveFile(thumbnailPath, details.path, details.filename).then(function (result) {
                insertInDB();
            }, function (err) {
                onError(err);
            });
        });
    };
    fp.startProces(req, res).then(function (result) {
        processImage();
    }, function (error) {
        onError(error);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map