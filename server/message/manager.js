"use strict";
var express = require('express');
var db = require("./dbMessages");
var dbMessages_1 = require("./dbMessages");
var fs = require('fs');
var router = express.Router();
var mydb = new db.DBMessages();
var onError = function (err, res) {
    console.log('onError error\n', err);
    res.json({ error: 'error', reason: err });
    var str = "\r\n" + new Date().toLocaleString() + "\r\n";
    str += JSON.stringify(err);
    fs.appendFile(SERVER + 'error.log', str);
};
router.get('/select/all', function (req, res) {
    var promise = mydb.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json(result);
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.get('/select/:id', function (req, res) {
    var promise = mydb.selectContentById(req.params.id);
    promise.then(function (result) {
        console.log("res", result);
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.post('/insert', function (req, res) {
    var body = req.body;
    var message = new dbMessages_1.Message(body.active, body.message);
    var promise = mydb.insertContent(message);
    promise.then(function (result) {
        message.id = result.id;
        console.log(message);
        res.json(message);
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.post('/update', function (req, res) {
    var body = req.body;
    var message = new dbMessages_1.Message(body.active, body.message, body.id);
    console.log(message);
    var promise = mydb.updateContent(message);
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
    var message = new dbMessages_1.Message(body.active, body.message, body.id);
    var promise = mydb.deleteContent(message);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map