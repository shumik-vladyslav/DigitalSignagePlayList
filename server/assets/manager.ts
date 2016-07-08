/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');
import db = require("./dbAssets");
import {DBAssets} from "./dbAssets";
import {Assets} from "./dbAssets";

// import fileProcessing = require("./fileProcessing");
import {IFileReq} from "./fileProcessing";
import {FileProcessing} from "./fileProcessing";
import {ImageProcess} from "./ImageProcess";
// import {IUplResult} from "../../docs";
// import IUplResult = upload.IUplResult;

declare var WWW:string;
declare var SERVER:string;

const router = express.Router();
var mydb: DBAssets = new db.DBAssets();

var fs = require('fs');

// mydb.deleteTable();
mydb.createNewTable();

class IUplResult {
    constructor() {
        this.result = {
            insertId: 0,   // id in DB
            thumbPath: '',  // path to thumbnail
            imagePath: ''  // path to original image};
        }
    }
    success: string;
    result: {
        insertId: number;   // id in DB
        thumbPath: string;  // path to thumbnail
        imagePath: string;  // path to original image
    }
}

class IError {
    error: string;
    reason: any
}


router.post('/upload', function(req:express.Request,res:express.Response) {
    var fp:FileProcessing = new FileProcessing();
    var ip:ImageProcess = new ImageProcess();

    var onSuccess = function (result: IUplResult) {
        console.log('onSuccess result\n', result);
        // res.json({success:'success', result: result});
        result.success = "success";
        res.json(result);
    };

    var onError = function (err: any) {
        console.log('onError error\n', err);
        res.json({error:'error', reason:err});
    };

    var makeAsset = function (): Assets {
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
        var a: Assets = makeAsset();

        var promise = mydb.insertContent(a);
        promise.then(function (result: {id:number}) {
            // console.log(result);
            var out: IUplResult = new IUplResult();
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