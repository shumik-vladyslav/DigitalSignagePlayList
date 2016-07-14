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

// var p = mytable.addNewColumn();
// console.log(p);

/**
 * @api {get} /api/messages/select/all Get All Messages
 * @apiVersion 0.0.1
 * @apiName GetMessages
 * @apiGroup Messages
 *
 * @apiDescription Response all messages from DB.
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/messages/select/all
 *
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "data": [
 *             {
 *                 "id": 1,
 *                 "activ": 1,
 *                 "message": "some text"
 *             },
 *             {
 *                 "id": 2,
 *                 "activ": 0,
 *                 "message": "some text"
 *             }
 *         ]
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/select/all', function (req:express.Request, res:express.Response) {
    var promise = mytableP.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json({data:result});
        // sellect
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

/**
 * @api {get} /api/messages/select/:id Get Message
 * @apiVersion 0.0.1
 * @apiName GetMessage
 * @apiGroup Messages
 *
 * @apiDescription Response message from DB by id.
 *
 * @apiParam {number} id   id in BD
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  1
 *     }
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/messages/select/1
 *
 * @apiSuccessExample {json} Success-Response:
 *      {
 *          "data": {
 *              "id": 1,
 *              "activ": "true",
 *              "message": "some text"
 *          }
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/selectPlayListItemById/:id', function (req:express.Request, res:express.Response) {
    var promise = mytableP.selectPlayListItemById(req.params.id);
    // res.json(req.params);
    promise.then(function (result: ISPlayListItem) {
        if(result !== {}) {
            console.log("res", result);
            res.json({data:result});
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
 * @api {get} /api/messages/select/:id Get Message
 * @apiVersion 0.0.1
 * @apiName GetMessage
 * @apiGroup Messages
 *
 * @apiDescription Response message from DB by id.
 *
 * @apiParam {number} id   id in BD
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  1
 *     }
 *
 * @apiExample {js} Example usage:
 *     http://127.0.0.1:8888/api/messages/select/1
 *
 * @apiSuccessExample {json} Success-Response:
     [{
     id: 1,
     listId: 5,
     assetId: 1,
     duration: 10,
     afterId: 0,
     originalName: "face.png",
     path: "/clientAssets/uploads/userImages/_1468357328476_face.png",
     thumb: "/clientAssets/uploads/thumbnails/_1468357328476_face.png",
     size: 132545,
     width: 350,
     height: 350,
     mime: "image/png",
     orientation: null,
     active: null,
     orig_duration: null
     }]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/get-playlistById/:id', function (req:express.Request, res:express.Response) {
    var promise = mytableP.selectPlayListItemById(req.params.id);
    // res.json(req.params);
    promise.then(function (result:ISPlayListItem[]) {
        if(result !== {}) {
            console.log("res", result);
            res.json({data:result});
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

router.get('/selectmax/:item', function (req:express.Request, res:express.Response) {
    var promise = mytableP.selectMax(req.params.item);
    console.log('select max');
    // res.json(req.params);
    promise.then(function (result) {
        if(result !== {}) {
            console.log("res", result);
            res.json({data:result});
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

router.get('/create-playlist', function (req:express.Request, res:express.Response) {
    var column_name: string = 'listId';
    var promise = mytableP.selectMax(column_name);
    // res.json(req.params);
    promise.then(function (result: {column_name:number}) {
        if(result !== {}) {
            var max = result.column_name ++;
            // console.log('item result', result);
            var p = mytableP.insertContent(result);
            p.then(function (result: {id:number}) {
                    // console.log("res", column_name, result.listId);
                    res.json({data:{'playlistId':max}});

                // var p2 = mytableP.selectContentById(result.id);
                // p2.then(function (result: ISPlayListItem) {
                //     console.log("res", column_name, result.listId);
                //     res.json({data:{'listId':result.listId}});
                // }, function (err) {
                //     onError(err, res);
                // });
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

router.post('/insert-content', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    // var checkPlaylist: ISPlayList;
    console.log('body ', body);
    var pl = new PlayList(body);
    console.log('playlist ', pl);

    var isValid = function (arg:PlayList) {
        return (typeof pl.listId === 'number' && typeof pl.assetId === 'number' && typeof pl.afterId === 'number');
    };

    if(!isValid(pl)) {
        res.json({error:'not all fields pl.listId && pl.assetId && pl.afterId, and all of them must by number', pl:pl});
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

    // var control_obj = {listId:0, assetId:0, afterId:0};
    //
    // for(var str in body){
    //     if(str in control_obj) control_obj[str] = 1;
    // }

    // for(var str in control_obj) {
    //     if(control_obj[str] === 0) {
    //         console.log(str, 'not found or not valid');
    //     }
    // }

    // for(var str in body) {
    //     for(var str2 in playlist) {
    //         if(str === str2 && str in obj) {
    //             playlist[str2] = body[str];
    //         }
    //     }
    // }
    // console.log('playlist2 ', playlist);

    if(body.listId === 0 || typeof body.listId !== 'number') {
        res.send('listId not valid or not found');
        return;
    } else if (body.assetId === 0 || typeof body.assetId !== 'number') {
        res.send('assetId not valid or not found');
        return;
    } else if (typeof body.afterId !== 'number') {
        res.send('afterId not found');
        return;
    }

    var arr_control: string[] = [];

    for(var str in body) {
        if(str in pl) {} else {
            arr_control.push(str);
            console.log(str, ' field does not exist');
        }
    }

    if(arr_control.length) {
        res.send(arr_control.join(', ') + ' - field does not exist');
        return;
    }

});

/**
 * @api {post} /api/messages/insert Insert Message
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

router.post('/insert', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    var playlist = new PlayList(body);

    var promise = mytableP.insertContent(playlist);
    promise.then(function (result) {
        // console.log(result);
        playlist.id = result.id;
        console.log(playlist);
        res.json(playlist);
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
    console.log(body);
    var playlist = new PlayList(body);

    // playlist.id = body.id;
    // playlist.listId = body.listId;
    // playlist.assetId = body.assetId;
    // playlist.duration = body.duration;
    // playlist.afterId = body.afterId;

    // res.json(req.params);

    var promise = mytableP.updateContent(playlist);
    promise.then(function (result: {changes:number}) {
        if(result.changes) {
            
            res.json({data:result});
        } else {
            onError(result, res);
        }
        console.log(result);

        // sellect
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

router.post('/delete', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var playlist = new PlayList({});

    playlist.id = body.id;
    playlist.listId = body.listId;
    playlist.assetId = body.assetId;
    playlist.duration = body.duration;
    playlist.afterId = body.afterId;

    var promise = mytableP.deleteContent(playlist);
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