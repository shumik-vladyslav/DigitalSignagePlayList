"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client/');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');
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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = process.env.PORT || 8888;
app.use('/api/users', require('./server/users/index'));
app.use('/api/user', require('./server/users/user'));
app.use('/api/content', require('./server/content/manager'));
app.use('/api/assets', require('./server/assets/manager'));
app.listen(port, function () {
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});
//# sourceMappingURL=server.js.map