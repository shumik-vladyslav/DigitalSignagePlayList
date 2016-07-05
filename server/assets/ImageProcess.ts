/// <reference path="../typings/express/express.d.ts" />

import Q = require('q');
import * as express from 'express';
import {IFileReq} from "./fileProcessing";

declare var WWW:string;
declare var SERVER:string;


export class  ImageProcess {
    path = require('path');
    Jimp = require("jimp");

    deferred: Q.Deferred<any>;

    pathDest: string;
    tempFolder: string;

    filename: string;
    widthImage: number;
    heightImage: number;

    thumbSize: number = 128;
    image: any;
    isLandScape:boolean;

    onError(err){
        this.deferred.reject(err);
    }

    onSuccess(result){
        this.deferred.resolve(result);
    }

    constructor() {
        this.deferred = Q.defer();
        this.tempFolder = SERVER + '/uploads/thumbnails/';
    }

    private resizeImage(){

        this.widthImage = this.image.bitmap.width;
        this.heightImage = this.image.bitmap.height;

        try {
            this.isLandScape = this.image.bitmap.height < this.image.bitmap.width;
            var p:any = this.isLandScape ? this.image.resize(this.Jimp.AUTO, this.thumbSize) :
                this.image.resize(this.thumbSize, this.Jimp.AUTO);
        } catch (e) {
            this.onError(e);
            return;
        }

        let x = 0;
        let y = 0;

        if(this.isLandScape){
            x = (this.image.bitmap.width-this.thumbSize)/2;
        } else {
            y = (this.image.bitmap.height-this.thumbSize)/2;
        }

        p.crop(x,y,this.thumbSize,this.thumbSize)
            .write(this.pathDest, (err) => {
                if(err) this.onError(err);
                else this.onSuccess(this.pathDest);
            });
    }

    private readImage(filePath: string) {
        this.Jimp.read(filePath).then((image)=> {
            this.image = image;
            // console.log('image', this.image);
            this.resizeImage();
        }).catch(function (err) {
            console.log(err);
            this.onError(err);
        });
    }

    makeThumbnail(filePath: string, filename: string){

        this.pathDest = this.tempFolder + filename;
        this.filename = filename;

        // console.log('makeThumbnail pathDest\n', this.pathDest);

        this.readImage(filePath);

        return this.deferred.promise;
    }
}
