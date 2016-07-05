/// <reference path="../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');
import db = require("../db/dbAssets");
import {DBAssets} from "../db/dbAssets";
import {Assets} from "../db/dbAssets";

// import fileProcessing = require("./fileProcessing");
import {IFileReq} from "./fileProcessing";
import {FileProcessing} from "./fileProcessing";
import {ImageProcess} from "./ImageProcess";

declare var WWW:string;
declare var SERVER:string;

const router = express.Router();
var mydb: DBAssets = new db.DBAssets();

var fs = require('fs');

// mydb.deleteTable();
mydb.createNewTable();


router.post('/upload', function(req:express.Request,res:express.Response) {
    var fp:FileProcessing = new FileProcessing();
    var ip:ImageProcess = new ImageProcess();

    var onSuccess = function (result) {
        console.log('onSuccess result\n', result);
        res.json({success:'success', result: result});
    };

    var onError = function (err) {
        console.log('onError error\n', err);
        res.json({error:'error', result:err});
    };

    var makeAsset = function () {
        var lenWWW: number = WWW.length;

        var asset = new Assets();

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
        var details:IFileReq = fp.fileReq;
        // console.log('details\n', details);
        ip.makeThumbnail(details.path, details.filename).then( function (thumbnailPath:string) {
            // console.log('thumbnailPath ',thumbnailPath);
            fp.moveFile(thumbnailPath, details.path, details.filename).then( function (result) {
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

export = router