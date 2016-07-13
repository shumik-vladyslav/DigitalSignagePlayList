/// <reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/q/Q.d.ts"/>
///<reference path="../../typings/multer/multer.d.ts"/>

import Q = require('q');
import * as express from 'express';
import multer = require("multer");
import Multer = require("multer");
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

    fs = require('fs');
    path = require('path');
    multer = require('multer');

    fileReq: IFileReq;
    // filesReq: Array<IFileReq>;
    filesReq: IFileReq[];

    private pathDestC:string;

    promise: Q.Promise<any>;
    deffered: Q.Deferred<any>;

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

    // startProces(req:express.Request, res:express.Response): Q.Promise<any> {
    uploadImage(req:express.Request, res:express.Response): Q.Promise<any> {
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

        var upload:express.RequestHandler = multer({ storage : storage}).single('file');

        upload(req,res, (err)=> {
            if(err) {
                deferred.reject(err);
            } else {
                this.fileReq = req.file;

                // console.log(req.file);
                //console.log('fileReq ', this.fileReq);

                this.onFileUploaded();
                deferred.resolve(this.fileReq);
            }
        });

        return deferred.promise;
    }

    uploadImages(req:express.Request, res:express.Response): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        this.deffered = deferred;

        // console.log('req', req);

        var storage = this.multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, SERVER + '/uploads/' + file.fieldname);
            },
            filename: function (req, file, callback) {
                callback(null, '_' + Date.now() + '_' + file.originalname);
            }
        });

        var upload:express.RequestHandler = multer({ storage : storage}).array('userImages',2);

        upload(req, res, (err)=> {
            if(err) {
                deferred.reject(err);
            } else {
                this.filesReq = <any> req.files;

                // console.log(req.file);
                // console.log('fileReq ', this.fileReq);
                console.log('req.files\n', req.files);


                this.onFileUploaded();
                deferred.resolve(this.fileReq);
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
                // console.log('file size: ' + stats["size"]);
                deferred.resolve(stats["size"]);
            }
        });

        return deferred.promise;
    }

    newPathThumb: string;
    newOriginaImagelPath: string;

    moveFile(thumbnailPath:string, originaImagePath:string, filename:string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
       
        // var newPathThumb:string = this.path.resolve(__dirname + this.pathDestC + 'thumbnails/' + originaImagelName);
        // var newOriginaImagelPath:string = this.path.resolve(__dirname + this.pathDestC + 'userImages/' + originaImagelName);

        this.newPathThumb = this.pathDestC + 'thumbnails/' + filename;
        this.newOriginaImagelPath = this.pathDestC + 'userImages/' + filename;

        // console.log('newPathThumb ', newPathThumb);
        // console.log('newOriginalPath ', newOriginaImagelPath);

        this.fs.rename(thumbnailPath, this.newPathThumb, (err)=> {
            if(err){
                deferred.reject(err);
            } else {
                this.fs.rename(originaImagePath, this.newOriginaImagelPath, (err)=> {
                    deferred.resolve([this.newPathThumb, this.newOriginaImagelPath]);
                });
            }
        });

        return deferred.promise;
    }

    deleteFile(thumbnailPath:string, originaImagePath:string) {
        var deferred: Q.Deferred<any> = Q.defer();

        this.fs.unlink(thumbnailPath, (err)=> {
            if(err){
                deferred.reject(err);
            } else {
                this.fs.unlink(originaImagePath, (err)=> {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve();
                    }
                });
            }
        });

        return deferred.promise;
    }
}