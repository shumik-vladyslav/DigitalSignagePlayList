/// <reference path="../typings/express/express.d.ts" />
"use strict";
var express = require('express');
var db = require("../db/dbAssets");
var router = express.Router();
var mydb = new db.DBAssets();
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var fs = require('fs');
var Jimp = require("jimp");
// mydb.deleteTable();
// mydb.createNewTable();
router.post('/upload', function (req, res) {
    var fp = new fileProcessing_1.FileProcessing();
    var ip = new ImageProcess_1.ImageProcess();
    var onSuccess = function (result) {
        res.json({ success: 'success', result: 'File is uploaded' });
    };
    var onError = function (err) {
        res.json({ error: 'error', result: err });
    };
    var insertInDB = function () {
    };
    var processImage = function () {
        var details = fp.fileReq;
        console.log('details\n', details);
        ip.makeThumbnail(details.path, details.filename).then(function (thumbnailPath) {
            console.log('thumbnailPath ', thumbnailPath);
            fp.moveFile(thumbnailPath, details.path, details.filename).then(function (result) {
                onSuccess(result);
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