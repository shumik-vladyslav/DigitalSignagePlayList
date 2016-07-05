/// <reference path="../typings/express/express.d.ts" />

import Q = require('q');
import * as express from 'express';
import multer = require("multer");
declare var WWW:string;
declare var SERVER:string;

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

    private pathDestC:string;

    constructor() {
        this.pathDestC = WWW + '/clientAssets/uploads/';
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

        var storage = this.multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, SERVER + '/uploads/' + file.fieldname);
            },
            filename: function (req, file, callback) {
                callback(null, '_' + Date.now() + '_' + file.originalname);
            }
        });

        var upload:express.RequestHandler = multer({ storage : storage}).single('userImages');

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

    moveFile(thumbnailPath:string, originaImagePath:string, filename:string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
       
        // var newPathThumb:string = this.path.resolve(__dirname + this.pathDestC + 'thumbnails/' + originaImagelName);
        // var newOriginaImagelPath:string = this.path.resolve(__dirname + this.pathDestC + 'userImages/' + originaImagelName);

        var newPathThumb:string = this.pathDestC + 'thumbnails/' + filename;
        var newOriginaImagelPath:string = this.pathDestC + 'userImages/' + filename;

        console.log('newPathThumb ', newPathThumb);
        console.log('newOriginalPath ', newOriginaImagelPath);

        this.fs.rename(thumbnailPath, newPathThumb, (err)=> {
            if(err){
                deferred.reject(err);
            } else {
                this.fs.rename(originaImagePath, newOriginaImagelPath, (err)=>{
                    deferred.resolve([newPathThumb, newOriginaImagelPath]);
                });
            }
        });

        return deferred.promise;
    }
}