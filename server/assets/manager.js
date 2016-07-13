"use strict";
var express = require('express');
var AssetRow_1 = require("./AssetRow");
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var TableModel_1 = require("../db/TableModel");
var router = express.Router();
var mytable = new TableModel_1.TableModel("assets", AssetRow_1.Asset.getInit());
var fs = require('fs');
var multer = require("multer");
var SUplResult = (function () {
    function SUplResult() {
    }
    return SUplResult;
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
        var asset = new AssetRow_1.Asset({});
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
        var promise = mytable.insertContent(a);
        promise.then(function (result) {
            console.log('insertInDB done');
            var out = new SUplResult();
            out.insertId = result.id;
            out.thumbPath = a.thumb;
            out.imagePath = a.path;
            res.json({ data: out });
            onSuccess(out, res);
        }, function (err) {
            fp.deleteFile(fp.newPathThumb, fp.newOriginaImagelPath);
            onError(err, res);
        });
    };
    var processImage = function () {
        var details = fp.fileReq;
        ip.makeThumbnail(details.path, details.filename).then(function (thumbnailPath) {
            console.log('ip.makeThumbnail done ');
            fp.moveFile(thumbnailPath, details.path, details.filename).then(function (result) {
                console.log('fp.moveFile done');
                insertInDB();
            }, function (err) {
                onError(err, res);
            });
        });
    };
    fp.uploadImage(req, res).then(function (result) {
        console.log('result uploadImage done\n');
        processImage();
    }, function (error) {
        onError(error, res);
    });
});
router.post('/uploads', function (req, res) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, SERVER + '/uploads/temp');
        },
        filename: function (req, file, callback) {
            callback(null, '_' + Date.now() + '_' + file.originalname);
        }
    });
    var upload = multer({ storage: storage }).array('file', 10);
    upload(req, res, function (err) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(req.files);
            console.log(this);
            res.json(req.files);
        }
    });
    return;
    var fp = new fileProcessing_1.FileProcessing();
    var ip = new ImageProcess_1.ImageProcess();
    var makeAsset = function () {
        var lenWWW = WWW.length;
        var asset = new AssetRow_1.Asset({});
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
        var promise = mytable.insertContent(a);
        promise.then(function (result) {
            var out = new SUplResult();
            out.insertId = result.id;
            out.thumbPath = a.thumb;
            out.imagePath = a.path;
            res.json({ data: out });
            onSuccess(out, res);
        }, function (err) {
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
});
module.exports = router;
//# sourceMappingURL=manager.js.map