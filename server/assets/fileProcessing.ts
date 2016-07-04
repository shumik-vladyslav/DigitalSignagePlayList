/// <reference path="../typings/express/express.d.ts" />

// import fs = require ('fs');
// import path = require('path');
// import Jimp = require("jimp");
import Q = require('q');
import * as express from 'express';
import multer = require("multer");

export interface IFileReq {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export class FileProcessing {
    
    fileReq: IFileReq;

    fs = require('fs');
    path = require('path');
    multer = require('multer');

    pathDestS = '/../uploads/';
    pathDestC = '/../../client/mikeFolder/uploads/';

    constructor() {
        
    }

    onFileUploaded(){
        this.fs.stat(this.fileReq.path, (err, stats)=> {
            if (err) {
                this.deffered.reject(err);
            } else {
                if(this.fileReq.size === stats["size"]){
                    this.deffered.resolve(this.fileReq);
                } else {
                    this.deffered.reject(stats);
                }
            }
        });
    }

    promise: Q.Promise<any>;
    deffered: Q.Deferred<any>;

    startProces(req:express.Request, res:express.Response): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        this.deffered = deferred;

        // this.fileReq = req.file;
        //
        // console.log(req.file);
        // console.log(this.fileReq);

        var storage = this.multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, __dirname + '/../uploads/' + file.fieldname);
            },
            filename: function (req, file, callback) {
                callback(null, '_' + Date.now() + '_' + file.originalname);
            }
        });

        var upload:express.RequestHandler = multer({ storage : storage}).single('userImage');

        upload(req,res, (err)=> {
            if(err) {
                deferred.reject(err);
            } else {
                this.fileReq = req.file;

                console.log(req.file);
                console.log(this.fileReq);

                this.onFileUploaded();
                deferred.resolve();
            }
        });

        return deferred.promise;
    }

    checkFileSize(filePath:string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.fs.stat(filePath, function (err, stats) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log('file size: ' + stats["size"]);
                deferred.resolve(stats["size"]);
            }
        });

        return deferred.promise;
    }

    moveFile(thumbnailPath:string, originaPath:string, originalName:string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        // oldPath:string =

        var newPathThumb:string = this.pathDestC + 'thumbnails/' + originalName;
        var newOriginalPath:string = this.pathDestC + 'userImages/' + originalName;

        this.fs.rename(thumbnailPath, newPathThumb, (err)=> {
            if(err){
                deferred.reject(err);
            } else {
                this.fs.rename(originaPath, newOriginalPath, (err)=>{
                    deferred.resolve([newPathThumb, newOriginalPath]);
                });
            }
        });

        return deferred.promise;
    }

    // resizeImage(filePath:string, fileName:string, destination:string): Q.Promise<any> {
    //     var deferred: Q.Deferred<any> = Q.defer();
    //
    //     this.Jimp.read(filePath).then(function (image) {
    //         console.log(__dirname + destination + '_small_' + fileName);
    //         image.resize(128, 128).write(__dirname + destination + '_small_' + fileName);
    //         deferred.resolve(__dirname + destination + '_small_' + fileName);
    //     }).catch(function (err) {
    //         console.log(err);
    //         deferred.reject(err);
    //     });
    //
    //     return deferred.promise;
    // }

    // moveFile(filePath:string, fileName:string, destination:string): Q.Promise<any> {
    //
    //     this.fs.createReadStream(filePath)
    //         .pipe(fs.createWriteStream(__dirname + destination + '_move_' + fileName))
    //         .unlink(filePath, (err) => {
    //             if (err) console.log(err);
    //             console.log('successfully deleted /tmp/hello');
    //         });
    // }

    // deleteFile(filePath:string): Q.Promise<any> {
    //     // var deferred: Q.Deferred<any> = Q.defer();
    //
    //     var t = fs.unlink(filePath);
    //
    //     console.log('file deleted', t);
    //
    //     // return deferred.promise;
    // }

    // moveFile(filePath:string, destination:string): Q.Promise<any> {
    //     var deferred: Q.Deferred<any> = Q.defer();
    //
    //     fs.createReadStream(filePath).pipe(fs.createWriteStream(destination));
    //
    //     return deferred.promise;
    // }

}