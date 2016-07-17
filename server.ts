/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
declare var GLOBAL:any;
declare var ROOT:string;
declare var WWW:string;
declare var SERVER:string;

var fs = require('fs');
var request = require('request');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
    changeOrigin:true,
    port:80
});

var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client/');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');

GLOBAL.onError = function (err: any, res:express.Response) {
    console.log('onError error\n', err);
    //TODO Remove reason in production
    res.json({error:'error', reason:err});

    var str: string = "\r\n" + new Date().toLocaleString() + "\r\n";
    str += JSON.stringify(err);

    fs.appendFile(SERVER + '/error.log', str);
};

//////////   Types  only/////////////
import {Request} from "express";
import {Response} from "express";
import {Express} from "express";
///////////////////////////////////////

const app:Express = express();

// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(cookie());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret:'somesecrettokenhere'
}));


app.use('/api',bodyParser.urlencoded({extended: true}));
app.use('/api',bodyParser.json());

app.use(express.static(WWW));

app.get('/', function(req:express.Request, res:express.Response){
    res.sendFile('indexts.html',{ 'root':WWW});
});

app.get('/dashboard', function(req:express.Request, res:express.Response){

    res.sendFile('indexts.html',{ 'root':WWW});
});
app.get('/screen/*', function(req:express.Request, res:express.Response){
    res.sendFile('screen.html',{ 'root':WWW});
});
app.get('/dashboard/*', function(req:express.Request, res:express.Response){
    res.sendFile('indexts.html',{ 'root':WWW});
});

app.get('/apidocs', function(req:express.Request, res:express.Response){

    res.sendFile('index.html',{ 'root':path.resolve(WWW + '/apidocs/')});
});

app.use(function(req:Request, res:Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.all('/proxy/*', function(req: express.Request, res:express.Response) {
    var proxyURL = "http://digitalsignage.front-desk.ca/" ;
    req.url = req.url.substr(6);
    var options = {target : proxyURL};
    proxy.web(req, res, options);

});

const port:number = process.env.PORT || 56777;
// app.use('/api/users', require('./server/users/index'));
// app.use('/api/user', require('./server/users/user'));
app.use('/api/content', require('./server/content/manager'));
app.use('/api/assets', require('./server/assets/manager'));
app.use('/api/playlists', require('./server/playlists/manager'));
app.use('/api/messages', require('./server/message/manager'));

var rss = require('./server/libs/rss');

app.get('/api/rss/:id',function(req: express.Request, res:express.Response){
    rss.read(req.params.id,function(result){
        res.json({data:result})
    });
})
var phantom = require('node-phantom');
var webshot = require('webshot');
//var webpage = require('webpage');
app.get('/api/web2/:id',function(req: express.Request, res:express.Response){
    var phantom =require('node-phantom');
    phantom.create(function(err,ph) {
        res.json(err)
        console.log(ph);
    });
});

app.get('/api/webpage/:id',function(req: express.Request, res:express.Response){

   /* var page = webpage.create();
    page.open('http://uplight.ca', function(status) {
        console.log("Status: " + status);
        if(status === "success") {
            page.render('example.png');
        }

        phantom.exit();
        res.json(status)
    });*/

    webshot('uplight.ca', 'uplight.png', function(err) {
        // screenshot now saved to google.png
        res.json(err);
    });
   /* phantom.create(function(error,ph){
        console.log(error);
        res.json(ph)
        ph.createPage(function(err,page){
            page.open('http://uplight.ca' ,function(err,status){
                page.render('example.png');

            });
        });

    });*/
})

app.listen(port,function(){
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});

