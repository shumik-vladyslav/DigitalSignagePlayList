"use strict";
var express = require('express');
var db = require("./dbAssets");
var dbAssets_1 = require("./dbAssets");
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var router = express.Router();
var mydb = new db.DBAssets();
var fs = require('fs');
var IUplResult = (function () {
    function IUplResult() {
    }
    return IUplResult;
}());
var IError = (function () {
    function IError() {
    }
    return IError;
}());
var ISResult = (function () {
    function ISResult(data) {
        this.data = data;
    }
    return ISResult;
}());
var onSuccess = function (result, res) {
    console.log('onSuccess result\n', result);
    res.json(new ISResult(result));
};
router.post('/upload', function (req, res) {
    var fp = new fileProcessing_1.FileProcessing();
    var ip = new ImageProcess_1.ImageProcess();
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
            out.insertId = result.id;
            out.thumbPath = a.thumb;
            out.imagePath = a.path;
            onSuccess(out, res);
        }, function (err) {
            console.log(err);
            fp.deleteFile(fp.newPathThumb, fp.newOriginaImagelPath);
            onError(err, res);
        });
    };
    var processImage = function () {
        var details = fp.fileReq;
        ip.makeThumbnail(details.path, details.filename).then(function (thumbnailPath) {
            fp.moveFile(thumbnailPath, details.path, details.filename).then(function (result) {
                insertInDB();
            }, function (err) {
                onError(err, res);
            });
        });
    };
    fp.startProces(req, res).then(function (result) {
        processImage();
    }, function (error) {
        onError(error, res);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map