/// <reference path="../typings/express/express.d.ts" />

import Q = require('q');
import * as express from 'express';
declare var WWW:string;
declare var SERVER:string;


export class  ImageProcess {
    path = require('path');
    Jimp = require("jimp");

    deferred: Q.Deferred<any>;

    pathDest: string;
    tempFolder: string;

    filename: string;

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

    getImagePath(): string{
        return this.pathDest;
    }

    private resizeImage(){
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
            console.log('this.image.bitmap.width = ', this.image.bitmap.width);
            console.log('x = ', x);
        } else {
            y = (this.image.bitmap.height-this.thumbSize)/2;
            console.log('this.image.bitmap.height = ', this.image.bitmap.height);
            console.log('y = ', y);
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

        console.log('makeThumbnail pathDest\n', this.pathDest);

        this.readImage(filePath);

        return this.deferred.promise;
    }
}
