/// <reference path="../typings/express/express.d.ts" />

import Q = require('q');
import * as express from 'express';
// import Jimp from 'jimp';

// export interface IJimpImage {
//     _originalMime: string;
//     bitmap:{
//         data:Buffer,
//         width:number,
//         height:number
//     }
// }


export class  ImageProcess {
    path = require('path');
    Jimp = require("jimp");

    pathDest: string;
    folder: string = '/../uploads/thumbnails/';

    fileOriginalname: string;

    thumbSize: number = 128;
    image: Jimp;
    isLandScape:boolean;


    constructor(){

    }

    deffered: Q.Deferred<any>;

    getImagePath(): string{
        return this.pathDest;
    }

    private resizeImage(){
        this.isLandScape = this.image.bitmap.height<this.image.bitmap.width;
        var p: any = this.isLandScape ? this.image.resize(this.Jimp.AUTO, this.thumbSize) :
                                        this.image.resize(this.thumbSize, this.Jimp.AUTO);
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

        //p.quality(80)
        p.crop(x,y,this.thumbSize,this.thumbSize)
            .write(this.pathDest);
            // .catch(function (err) {
            //     console.log(err);
            //     this.deferred.reject(err);
            // });
        this.deffered.resolve(this.pathDest);
    }

    private readImage(filePath: string) {
        this.Jimp.read(filePath).then((image)=> {
            // console.log(__dirname + pathDest + '_small_' + fileOriginalname);
            this.image = image;
            // console.log('image', this.image);
            this.resizeImage();
            // var height = image.bitmap.height;
            // var width = image.bitmap.width;
        }).catch(function (err) {
            console.log(err);
            this.deferred.reject(err);
        });
    }


    makeThumbnail(filePath: string, fileOriginalname: string){
        var deferred: Q.Deferred<any> = Q.defer();
        this.deffered = deferred;
        this.pathDest = this.path.resolve(__dirname + this.folder + fileOriginalname);
        this.fileOriginalname = fileOriginalname;

        console.log('makeThumbnail pathDest\n', this.pathDest);

        this.readImage(filePath);

        // this.Jimp.read(filePath).then((image)=> {
        //     console.log(__dirname + pathDest + '_small_' + fileOriginalname);
        //     var height = image.bitmap.height;
        //     var width = image.bitmap.width;
        //
        //
        //     image.resize(128, 128).write(__dirname + pathDest + '_small_' + fileOriginalname);
        //     deferred.resolve(__dirname + pathDest + '_small_' + fileOriginalname);
        // }).catch(function (err) {
        //     console.log(err);
        //     deferred.reject(err);
        // });

        return deferred.promise;
    }

}
