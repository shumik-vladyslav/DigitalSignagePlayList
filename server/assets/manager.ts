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

////////   Upload file with multer   //////////

/*var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../uploads/' + file.fieldname);
    },
    filename: function (req, file, callback) {
        callback(null, '_' + Date.now() + '_' + file.originalname);
    }
});
var upload:express.RequestHandler = multer({ storage : storage}).single('userImage');*/


// router.get('/uploadform', function(req,res){
//
//     res.sendFile(path.resolve(__dirname + '/../../client/serverTest.html'));
// });

router.post('/upload', function(req:express.Request,res:express.Response) {
    var fp:FileProcessing = new FileProcessing();
    var ip:ImageProcess = new ImageProcess();

    var onSuccess = function () {
        res.json({success:'success', result:'File is uploaded'});
    };

    var onError = function () {
        res.json({error:'error', result:'Error uploading file.'});
    };

    var insertInDB = function () {
        
    };

    var processImage = function () {
        var details:IFileReq = fp.fileReq;
        console.log('details\n', details);
        ip.makeThumbnail(details.path, details.originalname).then( function (thumbnailPath:string) {
            console.log('thumbnailPath ',thumbnailPath);
            fp.moveFile(thumbnailPath, details.path, details.originalname);
        });
    };
    
    fp.startProces(req, res).then(function (result) {
        onSuccess();
        processImage();
    }, function (error) {
        onError();
    });
    
    fp
    
/*    upload(req,res,function(err) {
        if(err) {
            return res.json({error:err});
            // return res.end("Error uploading file.");
        }
        // res.end("File is uploaded");

        var p: Q.Promise<any>  = fp.checkFileSize(req.file.path);
        
        p.then(function (size) {
            if(req.file.size === size){
                res.json({success:'success', result:'File is uploaded'}); // после всех обработок

                var p2: Q.Promise<any>  = fp.resizeImage(req.file.path, req.file.originalname, pathDestS + 'thumbnail/');
                var t = fp.moveFile(req.file.path, req.file.originalname, pathDestC + 'userImage/');
                console.log(t);
            } else {
                res.json({error:'error', result:'Error uploading file.'});
            }
        }, function (err) {
            console.log(err);
        });

        // fs.stat(req.file.path, function (err, stats) {
        //     console.log('file size: ' + stats["size"]);
        //     if(req.file.size === stats["size"]){
        //         res.json({success:'success', result:'File is uploaded'});
        //         Jimp.read(req.file.path).then(function (image) {
        //             console.log(__dirname + '/uploads/thumbnail/_small_' +  req.file.originalname);
        //             image.resize(56, 56).write(__dirname + '/../uploads/thumbnail/_small_' +  req.file.originalname);
        //         }).catch(function (err) {
        //             console.log(err);
        //         });
        //     }
        // });

        console.log(req.file);
    });*/
});

///////////  End upload  ///////////////////////

export = router