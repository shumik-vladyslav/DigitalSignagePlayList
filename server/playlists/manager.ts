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

/**
 * @api {get} /api/playlists/create-playlist Create New Playlist
 * @apiVersion 0.0.1
 * @apiName NewPlaylist
 * @apiGroup Playlists
 *
 * @apiDescription Create New Playlist ID in DB.
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/playlists/create-playlist
 *
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "data": {
 *                 "playlistId": 11
 *             }
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

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
 * @api {post} /api/playlists/insert-content Insert Playlist
 * @apiVersion 0.0.1
 * @apiName InsertContent
 * @apiGroup Playlists
 *
 * @apiDescription Insert Content(fields of playlist) in DB.
 *                 Return all inserted fields of playlists + full assets
 *
 * @apiParam {Number} listId     required parameter and must be > 0.
 * @apiParam {Number} assetId    required parameter and must be > 0.
 * @apiParam {Number} afterId    required parameter and must be !< 0.
 * @apiParam {Number} duration   optional
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "listId":7,
 *       "assetId": 3,
 *       "afterId":6
 *     }
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/playlists/insert-content
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *        "data": [
 *          {
 *            "id": 30,
 *            "originalName": "face.png",
 *            "path": "/clientAssets/uploads/userImages/_1468363584469_face.png",
 *            "thumb": "/clientAssets/uploads/thumbnails/_1468363584469_face.png",
 *            "size": 132545,
 *            "width": 350,
 *            "height": 350,
 *            "mime": "image/png",
 *            "orientation": null,
 *            "active": null,
 *            "orig_duration": null,
 *            "listId": 7,
 *            "assetId": 3,
 *            "duration": null,
 *            "afterId": 6
 *          }
 *        ]
 *      }
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
            res.json({data:result});
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
 * @api {post} /api/playlists/update-playlist-item Update Playlist
 * @apiVersion 0.0.1
 * @apiName UpdatePlaylist
 * @apiGroup Playlists
 *
 * @apiDescription Update Playlist(fields of playlist) in DB.
 *
 * @apiParam {Number} id         required parameter (prime).
 * @apiParam {Number} afterId    optional
 * @apiParam {Number} duration   optional
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":28,
 *       "duration":20,
 *       "afterId":6
 *     }
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/playlists/update-playlist-item
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *          "data": {
 *              "changes": 1
 *          }
 *       }
 *
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
        onError(err, res);
    });
});

router.post('/delete', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    console.log('body ', body);
    var pl = new PlayList(body);
    console.log('playlist ', pl);

    var promise = mydb.deleteContent(message);
    promise.then(function (result) {
        console.log(result);
        res.json({data:result});
        // sellect
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

export = router