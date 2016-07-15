"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookie = require('cookie-parser');
var fs = require('fs');
var request = require('request');
var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client/');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');
GLOBAL.onError = function (err, res) {
    console.log('onError error\n', err);
    res.json({ error: 'error', reason: err });
    var str = "\r\n" + new Date().toLocaleString() + "\r\n";
    str += JSON.stringify(err);
    fs.appendFile(SERVER + '/error.log', str);
};
var app = express();
app.use(cookie());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somesecrettokenhere'
}));
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
app.use(express.static(WWW));
app.get('/', function (req, res) {
    res.sendFile('indexts.html', { 'root': WWW });
});
app.get('/dashboard', function (req, res) {
    res.sendFile('indexts.html', { 'root': WWW });
});
app.get('/dashboard/*', function (req, res) {
    res.sendFile('indexts.html', { 'root': WWW });
});
app.get('/apidocs', function (req, res) {
    res.sendFile('index.html', { 'root': path.resolve(WWW + '/apidocs/') });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.all('/proxy/*', function (req, res) {
    var url = 'http://digitalsignage.front-desk.ca/';
    url = url + req.url.substr(7);
    console.log("proxying: " + url);
    request({ url: url, method: req.method, body: req.body }).pipe(res);
});
var port = process.env.PORT || 8888;
app.use('/api/content', require('./server/content/manager'));
app.use('/api/assets', require('./server/assets/manager'));
app.use('/api/playlists', require('./server/playlists/manager'));
app.use('/api/messages', require('./server/message/manager'));
app.listen(port, function () {
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});
//# sourceMappingURL=server.js.map