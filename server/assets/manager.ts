/// <reference path="../typings/express/express.d.ts" />

import * as express from 'express';
import db = require("../db/dbAssets");
import {DBAssets} from "../db/dbAssets";
import {Assets} from "../db/dbAssets";
import Request = Express.Request;
import Response = Express.Response;

const router = express.Router();
var mydb: DBAssets = new db.DBAssets();

import Q = require('q');

// import fileProcessing = require("./fileProcessing");
import {IFileReq} from "./fileProcessing";
import {FileProcessing} from "./fileProcessing";
import {ImageProcess} from "./ImageProcess";

var fs = require('fs');
var Jimp = require("jimp");

// mydb.deleteTable();
// mydb.createNewTable();


router.post('/upload', function(req:express.Request,res:express.Response) {
    var fp:FileProcessing = new FileProcessing();
    var ip:ImageProcess = new ImageProcess();

    var onSuccess = function (result) {
        res.json({success:'success', result:'File is uploaded'});
    };

    var onError = function (err) {
        res.json({error:'error', result:err});
    };

    var insertInDB = function () {
        
    };

    var processImage = function () {
        var details:IFileReq = fp.fileReq;
        console.log('details\n', details);
        ip.makeThumbnail(details.path, details.filename).then( function (thumbnailPath:string) {
            console.log('thumbnailPath ',thumbnailPath);
            fp.moveFile(thumbnailPath, details.path, details.filename).then( function (result) {
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

export = router