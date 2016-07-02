/// <reference path="../typings/express/express.d.ts" />

import * as express from 'express';
import db = require("../db/dbAssets");
import {DBAssets} from "../db/dbAssets";
import {Assets} from "../db/dbAssets";

const router = express.Router();
var mydb: DBAssets = new db.DBAssets();

// mydb.deleteTable();
// mydb.createNewTable();

////////   Upload file with multer   //////////
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '/_' + Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage : storage}).single('userImage');

router.get('/uploadform', function(req,res){

    res.sendFile(path.resolve(__dirname + '/../../client/serverTest.html'));
});

router.post('/upload', function(req,res) {
    upload(req,res,function(err) {
        console.log(req.file);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

///////////  End upload  ///////////////////////

export = router