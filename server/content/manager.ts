/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import db = require("../db/dbContent");
import {DBContent} from "../db/dbContent";
import {Content} from "../db/dbContent";

const router = express.Router();
var mydb: DBContent = new db.DBContent();
// var mycontent = new db.Content('cappuccino', 'coffee');
// var mycontent = new db.Content();

// mydb.deleteTable();
// mydb.createNewTable();

// var p = mydb.addNewColumn();
// console.log(p);

router.get('/select/all', function (req:express.Request, res:express.Response) {
    var promise = mydb.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.get('/select/:id', function (req:express.Request, res:express.Response) {
    var promise = mydb.selectContentById(req.params.id);
    // res.json(req.params);
    promise.then(function (result) {
        console.log("res", result);
        res.json(result);
    }, function (err) {
        console.log(err);
    });
});

router.post('/insert', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var mycontent = new Content(body.name, body.type, body.path, body.user, body.stamp);

    var promise = mydb.insertContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        mycontent.id = result.id;
        res.json(mycontent);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.post('/update', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var mycontent = new Content(body.name, body.type, body.path, body.user, body.stamp, body.id);
    console.log(mycontent);

    res.json(req.params);

    var promise = mydb.updateContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.post('/delete', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var mycontent = new Content(body.name, body.type, body.path, body.user, body.stamp, body.id);

    var promise = mydb.deleteContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

export = router



// var insertContent = function (mycontent) {
//     var promise = mydb.insertContent(mycontent);
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var selectContent = function () {
//     var promise = mydb.selectAllContent();
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var updateContent = function (mycontent) {
//     var promise = mydb.insertContent(mycontent);
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var deleteContent = function (mycontent) {
//     var promise = mydb.deleteContent(mycontent);
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var selectContentById = function (id) {
//     var promise = mydb.selectContentById(id);
//     promise.then(function (res) {
//         console.log("res", res);
//         // sellect
//     }, function (err) {
//         console.log(err);
//     });
// };



// isertContent(mycontent);
// selectContent();
// updateContent(mycontent);
// deleteContent(mycontent);

// selectContentById("coffee");

// console.log(mycontent);


// var hrTime = process.hrtime();
// var timestamp = hrTime[0];
// console.log(hrTime);
// console.log(timestamp);
// console.log(hrTime[0] * 1000000 + hrTime[1] / 1000);