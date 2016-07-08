/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import db = require("./dbMessages");
import {DBMessages} from "./dbMessages";
import {Message} from "./dbMessages";

const router = express.Router();
var mydb: DBMessages = new db.DBMessages();

// mydb.deleteTable();
mydb.createNewTable();

// var p = mydb.addNewColumn();
// console.log(p);

/**
 * @api {get} /api/messages/select/all Request User information
 * @apiName GetMessages
 * @apiGroup Messages
 *
 * @apiSuccess {Object[]} IMessage 
 * @apiSuccess {Number}   IMessage.id
 * @apiSuccess {Boolean}  IMessage.active
 * @apiSuccess {String}   IMessage.message
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiSuccess {String} lastname  Lastname of the User.
 */

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
    // res.send(req.body);
    // return;
    var message = new Message(body.active, body.message);

    var promise = mydb.insertContent(message);
    promise.then(function (result) {
        console.log(result);
        message.id = result.id;
        res.json(message);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.post('/update', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var message = new Message(body.active, body.message, body.id);
    console.log(message);

    res.json(req.params);

    var promise = mydb.updateContent(message);
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
    var message = new Message(body.active, body.message, body.id);

    var promise = mydb.deleteContent(message);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

export = router