/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>
///<reference path="users/db-users.ts"/>
"use strict";
//test
var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var expressJwt = require('express-jwt');
///////////////////////////////////////
var app = express();
// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(cookie());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somesecrettokenhere'
}));
//app.use('/api',bodyParser.urlencoded({extended: false}));
//app.use('/api',bodyParser.json());
app.use('/api', expressJwt({ secret: 'somesecrettokenhere' }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
//app.use('/login', require('./controllers/login.controller'));
//app.use('/register', require('./controllers/register.controller'));
//app.use('/app', require('./controllers/app.controller'));
//app.use('/api/users', require('./controllers/api/users.controller'));
app.use(express.static(path.resolve(__dirname + '/../client/')));
app.get('/', function (req, res) {
    res.sendFile('indexts.html', { 'root': __dirname + '/../client/' });
});
app.get('/dashboard', function (req, res) {
    res.sendFile('indexts.html', { 'root': __dirname + '/../client/' });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = process.env.PORT || 8888;
//app.use('/api/users', users);
//app.use('/api/user', user);
app.use('/api/content', require('./content/manager'));
app.use('/api/assets', require('./assets/manager'));
app.listen(port, function () {
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});
//# sourceMappingURL=server.js.map