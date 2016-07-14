/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');
// import mytable = require("../db/TableModel");

// import fileProcessing = require("./fileProcessing");
import {IFileReq} from "./fileProcessing";
import {FileProcessing} from "./fileProcessing";
import {ImageProcess} from "./ImageProcess";
import {TableModel} from "../db/TableModel";
import {Asset} from "./AssetRow";

declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

const router = express.Router();
var mytable: TableModel = new TableModel("assets", Asset.getInit());

var fs = require('fs');

// mytable.deleteTable();
// mytable.createNewTable().then(function (res) {
//     console.log(res);
// }, function (err) {
//     console.log(err);
// });
// mytable.getStucture().then(function (res) {
//     console.log(res);
// });

// var onError = function (err: any, res:express.Response) {
//     console.log('onError error\n', err);
//     //TODO Remove reason in production
//     res.json({error:'error', reason:err});
//
//     var str: string = "\r\n" + new Date().toLocaleString() + "\r\n";
//     str += JSON.stringify(err);
//
//     fs.appendFile(SERVER + 'error.log', str);
// };

class SUplResult {
    constructor() {}
    insertId: number;   // id in DB
    thumbPath: string;  // path to thumbnail
    imagePath: string;  // path to original image
}

class ISResult {
    // success: string = "success";
    constructor(public data: any) {}
}

var onSuccess = function (result: any, res:express.Response) {
    console.log('onSuccess result\n', result);
    // res.json({success:'success', result: result});
    // result.success = "success";
    res.json(new ISResult(result));
};


/**
 * @api {post} /api/assets/upload Upload Image
 * @apiVersion 0.0.1
 * @apiName UploadImage
 * @apiGroup Asset
 *
 * @apiDescription Upload Image and create thumbnail.
 *
 * @apiParamExample {html} Request-Example:
 *      <form name      =  "uploadForm"
 *            id        =  "uploadForm"
 *            enctype   =  "multipart/form-data"
 *            action    =  "/api/assets/upload"
 *            method    =  "POST"
 *      >
 *          <input type="file" name="userImages" />
 *          <input type="submit" value="Upload Image" name="submit">
 *      </form>
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/assets/upload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     data {
 *          insertId: 5,
 *          thumbPath: '/clientAssets/uploads/thumbnails/_1468011297776_face.png',
 *          imagePath: '/clientAssets/uploads/userImages/_1468011297776_face.png'
 *     }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/upload', function(req:express.Request,res:express.Response) {
    var fp:FileProcessing = new FileProcessing();
    var ip:ImageProcess = new ImageProcess();

    var makeAsset = function (): Asset {
        var lenWWW: number = WWW.length;

        var asset = new Asset({});

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
        var a: Asset = makeAsset();

        var promise = mytable.insertContent(a);
        promise.then(function (result: {id:number}) {
            console.log('insertInDB done');
            var out: SUplResult = new SUplResult();
            out.insertId = result.id;
            out.thumbPath = a.thumb;
            out.imagePath = a.path;
            res.json({data:out});
            onSuccess(out, res);
        }, function (err) {
            // console.log(err);
            fp.deleteFile(fp.newPathThumb, fp.newOriginaImagelPath);
            onError(err, res);
        });
    };

    var processImage = function () {
        var details:IFileReq = fp.fileReq;
        // console.log('details\n', details);
        ip.makeThumbnail(details.path, details.filename).then( function (thumbnailPath:string) {
            console.log('ip.makeThumbnail done ');
            fp.moveFile(thumbnailPath, details.path, details.filename).then( function (result) {
                console.log('fp.moveFile done');
                insertInDB();
            }, function (err) {
                onError(err, res);
            });
        });
    };

    // fp.startProces(req, res).then(function (result) {
    fp.uploadImage(req, res).then(function (result) {
        console.log('result uploadImage done\n');
        // console.log('asset\n', asset);
        processImage();
    }, function (error) {
        onError(error, res);
    });

});

router.post('/uploads', function(req:express.Request,res:express.Response) {
    // console.log(req.files);
    // res.send(req.body);
    // return;
    var fp:FileProcessing = new FileProcessing();
    var ip:ImageProcess = new ImageProcess();

    var makeAsset = function (): Asset {
        var lenWWW: number = WWW.length;

        var asset = new Asset({});

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
        var a: Asset = makeAsset();

        var promise = mytable.insertContent(a);
        promise.then(function (result: {id:number}) {
            // console.log(result);
            var out: SUplResult = new SUplResult();
            out.insertId = result.id;
            out.thumbPath = a.thumb;
            out.imagePath = a.path;
            res.json({data:out});
            onSuccess(out, res);
        }, function (err) {
            // console.log(err);
            fp.deleteFile(fp.newPathThumb, fp.newOriginaImagelPath);
            onError(err, res);
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
                onError(err, res);
            });
        });
    };

    // fp.startProces(req, res).then(function (result) {
    fp.uploadImages(req, res).then(function (result) {
        // console.log('result\n', result);
        // console.log('asset\n', asset);
        processImage();
    }, function (error) {
        onError(error, res);
    });

});

export = router