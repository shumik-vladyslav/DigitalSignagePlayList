"use strict";
var express = require('express');
var PlayListRow_1 = require("./PlayListRow");
var PlaylistsTable_1 = require("./PlaylistsTable");
var fs = require('fs');
var router = express.Router();
var mytableP = new PlaylistsTable_1.PlaylistsTable("playlists", new PlayListRow_1.PlayList());
router.get('/create-playlist', function (req, res) {
    var column_name = 'listId';
    var promise = mytableP.selectMax(column_name);
    promise.then(function (result) {
        if (result !== {}) {
            var max = ++result[column_name];
            console.log('result = ', result);
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
    var err;
    var isValid = function (arg) {
        if (arg.listId <= 0 || typeof arg.listId !== 'number') {
            err = 'listId <= 0 or must by number';
            return err;
        }
        else if (arg.assetId <= 0 || typeof arg.assetId !== 'number') {
            err = 'assetId <= 0 or must by number';
            return err;
        }
        else if (arg.afterId < 0 || typeof arg.afterId !== 'number') {
            err = 'afterId < 0 or must by number';
            return err;
        }
    };
    if (isValid(pl)) {
        res.json({ error: err, pl: pl });
        return;
    }
    var promise = mytableP.insertContent(pl);
    promise.then(function (result) {
        var p = mytableP.selectPlayListItemById(result.id);
        p.then(function (result) {
            console.log(result);
            res.json({ data: result });
        }, function (err) {
            console.log(err);
            onError(err, res);
        });
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.post('/update-playlist-item', function (req, res) {
    var body = req.body;
    console.log('body ', body);
    var pl = new PlayListRow_1.PlayList(body);
    console.log('playlist ', pl);
    var promise = mytableP.updateContent(pl);
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
        onError(err, res);
    });
});
router.post('/delete-playlist-item', function (req, res) {
    var body = req.body;
    console.log('body ', body);
    var pl = new PlayListRow_1.PlayList(body);
    console.log('playlist ', pl);
    var promise = mytableP.deleteContent(pl);
    promise.then(function (result) {
        console.log(result);
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map