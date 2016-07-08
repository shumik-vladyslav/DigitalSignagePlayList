///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";


export class DBAssets {
    private db:IDBDriver;
    
    constructor(){
        this.db = new DBDriver();
    }
    
    deleteTable(): Q.Promise<any> {
        var sql = "DROP TABLE assets";
        
        return this.db.deleteTable(sql);
    }

    createNewTable(): Q.Promise<any>  {
        var sql1 = "DROP TABLE assets";
        var sql2 = "CREATE TABLE assets (id INTEGER PRIMARY KEY AUTOINCREMENT, originalName TEXT, path TEXT, thumb TEXT, size INTEGER, width INTEGER, height INTEGER, mime TEXT)";

        return this.db.createTable(sql1, sql2);
    }

    insertContent(assets:Assets): Q.Promise<{id:number}> {
        var sql: string = 'INSERT INTO assets (originalName, path, thumb, size, width, height, mime) VALUES (?, ?, ?, ?, ?, ?, ?)';
        var data: any[] = [assets.originalName, assets.path, assets.thumb, assets.size, assets.width, assets.height, assets.mime];

        return this.db.insertOne(sql, data);
    }

}

export class Assets {

    public id :number;
    public originalName: string;
    public path:string;
    public thumb:string;
    public size: number;
    public width: number;
    public height: number;
    public mime: string;

    constructor() {
        // console.log('constructor Assets');
    }

}