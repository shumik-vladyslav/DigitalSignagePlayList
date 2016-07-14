"use strict";
var express = require('express');
var PlayListRow_1 = require("./PlayListRow");
var PlaylistsTable_1 = require("./PlaylistsTable");
var fs = require('fs');
var router = express.Router();
var mytableP = new PlaylistsTable_1.PlaylistsTable("playlists", new PlayListRow_1.PlayList());
router.get('/select/all', function (req, res) {
    var promise = mytableP.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.get('/selectPlayListItemById/:id', function (req, res) {
    var promise = mytableP.selectPlayListItemById(req.params.id);
    promise.then(function (result) {
        if (result !== {}) {
            console.log("res", result);
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.get('/get-playlistById/:id', function (req, res) {
    var promise = mytableP.selectPlayListItemById(req.params.id);
    promise.then(function (result) {
        if (result !== {}) {
            console.log("res", result);
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.get('/selectmax/:item', function (req, res) {
    var promise = mytableP.selectMax(req.params.item);
    console.log('select max');
    promise.then(function (result) {
        if (result !== {}) {
            console.log("res", result);
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.get('/create-playlist', function (req, res) {
    var column_name = 'listId';
    var promise = mytableP.selectMax(column_name);
    promise.then(function (result) {
        if (result !== {}) {
            var max = result.column_name++;
            var p = mytableP.insertContent(result);
            p.then(function (result) {
                res.json({ data: { 'playlistId': max } });
            }, function (err) {
                onError(err, res);
            });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.post('/insert-content', function (req, res) {
    var body = req.body;
    console.log('body ', body);
    var pl = new PlayListRow_1.PlayList(body);
    console.log('playlist ', pl);
    var isValid = function (arg) {
        return (typeof pl.listId === 'number' && typeof pl.assetId === 'number' && typeof pl.afterId === 'number');
    };
    if (!isValid(pl)) {
        res.json({ error: 'not all fields pl.listId && pl.assetId && pl.afterId, and all of them must by number', pl: pl });
        return;
    }
    var promise = mytableP.insertContent(pl);
    promise.then(function (result) {
        var p = mytableP.selectPlayListItemById(result.id);
        p.then(function (result) {
            console.log(result);
            res.json(result);
        }, function (err) {
            console.log(err);
            onError(err, res);
        });
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
    if (body.listId === 0 || typeof body.listId !== 'number') {
        res.send('listId not valid or not found');
        return;
    }
    else if (body.assetId === 0 || typeof body.assetId !== 'number') {
        res.send('assetId not valid or not found');
        return;
    }
    else if (typeof body.afterId !== 'number') {
        res.send('afterId not found');
        return;
    }
    var arr_control = [];
    for (var str in body) {
        if (str in pl) { }
        else {
            arr_control.push(str);
            console.log(str, ' field does not exist');
        }
    }
    if (arr_control.length) {
        res.send(arr_control.join(', ') + ' - field does not exist');
        return;
    }
});
router.post('/insert', function (req, res) {
    var body = req.body;
    var playlist = new PlayListRow_1.PlayList(body);
    var promise = mytableP.insertContent(playlist);
    promise.then(function (result) {
        playlist.id = result.id;
        console.log(playlist);
        res.json(playlist);
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.post('/update-playlist-item', function (req, res) {
    var body = req.body;
    console.log(body);
    var playlist = new PlayListRow_1.PlayList(body);
    var promise = mytableP.updateContent(playlist);
    promise.then(function (result) {
        if (result.changes) {
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
        console.log(result);
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.post('/delete', function (req, res) {
    var body = req.body;
    var playlist = new PlayListRow_1.PlayList({});
    playlist.id = body.id;
    playlist.listId = body.listId;
    playlist.assetId = body.assetId;
    playlist.duration = body.duration;
    playlist.afterId = body.afterId;
    var promise = mytableP.deleteContent(playlist);
    promise.then(function (result) {
        console.log(result);
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
module.exports = router;
//# sourceMappingURL=old_manager.js.map