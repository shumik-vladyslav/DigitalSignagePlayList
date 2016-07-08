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
declare  var onError: (err:any, res: express.Response) => void;

const router = express.Router();
var mydb: DBAssets = new db.DBAssets();

var fs = require('fs');

// mydb.deleteTable();
// mydb.createNewTable();

class IUplResult {
    constructor() {}
    insertId: number;   // id in DB
    thumbPath: string;  // path to thumbnail
    imagePath: string;  // path to original image
}

class IError {
    error: string;
    reason: any;
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
 * @apiGroup Assets
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
 *     IUplResult {
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
    
    fp.startProces(req, res).then(function (result) {
        // console.log('result\n', result);
        // console.log('asset\n', asset);
        processImage();
    }, function (error) {
        onError(error, res);
    });

});

export = router