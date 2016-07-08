"use strict";
var express = require('express');
var db = require("./dbMessages");
var dbMessages_1 = require("./dbMessages");
var router = express.Router();
var mydb = new db.DBMessages();
mydb.createNewTable();
router.get('/select/all', function (req, res) {
    var promise = mydb.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json(result);
    }, function (err) {
        console.log(err);
    });
});
router.get('/select/:id', function (req, res) {
    var promise = mydb.selectContentById(req.params.id);
    promise.then(function (result) {
        console.log("res", result);
        res.json(result);
    }, function (err) {
        console.log(err);
    });
});
router.post('/insert', function (req, res) {
    var body = req.body;
    var message = new dbMessages_1.Message(body.active, body.message);
    var promise = mydb.insertContent(message);
    promise.then(function (result) {
        console.log(result);
        message.id = result.id;
        res.json(message);
    }, function (err) {
        console.log(err);
    });
});
router.post('/update', function (req, res) {
    var body = req.body;
    var message = new dbMessages_1.Message(body.active, body.message, body.id);
    console.log(message);
    res.json(req.params);
    var promise = mydb.updateContent(message);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
    }, function (err) {
        console.log(err);
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
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map