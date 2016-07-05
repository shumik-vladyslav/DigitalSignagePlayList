/// <reference path="../typings/express/express.d.ts" />
"use strict";
var express = require('express');
var db = require("../db/dbAssets");
var dbAssets_1 = require("../db/dbAssets");
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var router = express.Router();
var mydb = new db.DBAssets();
var fs = require('fs');
// mydb.deleteTable();
mydb.createNewTable();
router.post('/upload', function (req, res) {
    var fp = new fileProcessing_1.FileProcessing();
    var ip = new ImageProcess_1.ImageProcess();
    var onSuccess = function (result) {
        console.log('onSuccess result\n', result);
        res.json({ success: 'success', result: result });
    };
    var onError = function (err) {
        console.log('onError error\n', err);
        res.json({ error: 'error', result: err });
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
        var promise = mydb.insertContent(makeAsset());
        promise.then(function (result) {
            // console.log(result);
            onSuccess(result);
        }, function (err) {
            console.log(err);
            fp.deleteFile(fp.newPathThumb, fp.newOriginaImagelPath);
            onError(err);
        });
    };
    var processImage = function () {
        var details = fp.fileReq;
        // console.log('details\n', details);
        ip.makeThumbnail(details.path, details.filename).then(function (thumbnailPath) {
            // console.log('thumbnailPath ',thumbnailPath);
            fp.moveFile(thumbnailPath, details.path, details.filename).then(function (result) {
                // console.log('moveFile result ', result);
                insertInDB();
            }, function (err) {
                onError(err);
            });
        });
    };
    fp.startProces(req, res).then(function (result) {
        // console.log('result\n', result);
        // console.log('asset\n', asset);
        processImage();
    }, function (error) {
        onError(error);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map