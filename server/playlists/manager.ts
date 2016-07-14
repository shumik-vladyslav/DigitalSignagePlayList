/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');

import {TableModel} from "../db/TableModel";
import {PlayList, ISPlayList} from "./PlayListRow";
import {PlaylistsTable, ISPlayListItem} from "./PlaylistsTable";

declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

var fs = require('fs');

const router = express.Router();
// var mytable: TableModel = new TableModel("playlists", PlayList.getInit());
var mytableP: PlaylistsTable = new PlaylistsTable("playlists", new PlayList());

// mytableP.deleteTable();
// mytableP.createNewTable().then(function (res) {
//     console.log(res);
// }, function (err) {
//     console.log(err);
// });

router.get('/create-playlist', function (req:express.Request, res:express.Response) {
    var column_name: string = 'listId';
    var promise = mytableP.selectMax(column_name);
    // res.json(req.params);
    promise.then(function (result: {column_name:number}) {
        if(result !== {}) {
            var max = ++result[column_name];
            console.log('result = ', result);
            var p = mytableP.insertContent(result);
            p.then(function (result: {id:number}) {
                    // console.log("res", column_name, result.listId);
                    res.json({data:{'playlistId':max}});
            }, function (err) {
                onError(err, res);
            });
        } else {
            onError(result, res);
        }
        // res.json({data:result});
    }, function (err) {
        console.log(err);
        onError(err, res);
        // res.json(err);
    });
});

/**
 * @api {post} //api/playlistsinsert Insert Message
 * @apiVersion 0.0.1
 * @apiName InsertMessages
 * @apiGroup Messages
 *
 * @apiDescription Insert messages in DB.
 *
 * @apiParam {String} active    true or false.
 * @apiParam {String} message   Message text
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "active":  "true",
 *       "message": "some text"
 *     }
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/messages/insert
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "activ": "true"
 *       "message": "some text"
 *       "id": 1
 *     }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/insert-content', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    console.log('body ', body);
    var pl = new PlayList(body);
    console.log('playlist ', pl);

    // var isValid = function (arg:PlayList) {
    //     return (typeof pl.listId === 'number' && typeof pl.assetId === 'number' && typeof pl.afterId === 'number');
    // };
    var err: string;

    var isValid = function (arg:PlayList) {
        if(arg.listId <= 0 || typeof arg.listId !== 'number') {
            err = 'listId <= 0 or must by number';
            return err;
        } else if (arg.assetId <= 0 || typeof arg.assetId !== 'number') {
            err = 'assetId <= 0 or must by number';
            return err;
        } else if (arg.afterId < 0 || typeof arg.afterId !== 'number') {
            err = 'afterId < 0 or must by number';
            return err;
        }
    };

    if(isValid(pl)) {
        res.json({error:err, pl:pl});
        return;
    }

    var promise = mytableP.insertContent(pl);
    promise.then(function (result: {id:number}) {
        // console.log(result);
        var p = mytableP.selectPlayListItemById(result.id);
        p.then(function (result: ISPlayListItem) {
            console.log(result);
            res.json(result);
        }, function (err) {
            console.log(err);
            onError(err, res);
        });
    }, function (err) {
        console.log(err);
        onError(err, res);
        // res.json(err);
    });
});

/**
 * @api {post} /api/messages/update Update Message
 * @apiVersion 0.0.1
 * @apiName UpdateMessage
 * @apiGroup Messages
 *
 * @apiDescription Update messages in DB.
 *
 * @apiParam {Number} id        id in BD
 * @apiParam {String} active    true or false.
 * @apiParam {String} message   Message text
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":      1
 *       "active":  true,
 *       "message": "some text"
 *     }
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/messages/update
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "changes": 1
 *       }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/update-playlist-item', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    console.log('body ', body);
    var pl = new PlayList(body);
    console.log('playlist ', pl);

    var promise = mytableP.updateContent(pl);
    promise.then(function (result: {changes:number}) {
        if(result.changes) {
            res.json({data:result});
        } else {
            onError(result, res);
        }
        console.log(result);
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

export = router