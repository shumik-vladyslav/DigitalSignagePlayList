"use strict";
var express = require('express');
var db = require("./dbContent");
var dbContent_1 = require("./dbContent");
var router = express.Router();
var mydb = new db.DBContent();
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
    var mycontent = new dbContent_1.Content(body.name, body.type, body.path, body.user, body.stamp);
    var promise = mydb.insertContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        mycontent.id = result.id;
        res.json(mycontent);
    }, function (err) {
        console.log(err);
    });
});
router.post('/update', function (req, res) {
    var body = req.body;
    var mycontent = new dbContent_1.Content(body.name, body.type, body.path, body.user, body.stamp, body.id);
    console.log(mycontent);
    res.json(req.params);
    var promise = mydb.updateContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
    }, function (err) {
        console.log(err);
    });
});
router.post('/delete', function (req, res) {
    var body = req.body;
    var mycontent = new dbContent_1.Content(body.name, body.type, body.path, body.user, body.stamp, body.id);
    var promise = mydb.deleteContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
    }, function (err) {
        console.log(err);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map