///<reference path="../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";


export class DBContent {
    private db: IDBDriver;
  
    constructor(){
        this.db = new DBDriver();
    }

    createNewTable(): Q.Promise<any>  {
        var sql1 = "DROP TABLE test";
        var sql2 = "CREATE TABLE test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, path TEXT, user TEXT, timestamp INTEGER)";

        return this.db.createTable(sql1, sql2);
    }

    selectAllContent() {
        var sql: string = "SELECT * FROM content";
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    selectContentById(id:number) {
        var sql: string = "SELECT * FROM content WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
    }

    insertContent(cont:Content) {
        var sql: string = 'INSERT INTO content (name, type, path, user, timestamp) VALUES (?, ?, ?, ?, ?)';
        var data: any[] = [cont.name, cont.type, cont.path, cont.user, cont.timestamp];

        return this.db.insertOne(sql, data);
    }

    updateContent(cont:Content) {
        var sql: string = 'UPDATE content SET name = ?, type = ?, path = ?, user = ?, timestamp = ? WHERE id = ?';
        var data: any[] = [cont.name, cont.type, cont.path, cont.user, cont.timestamp, cont.id];

        return this.db.updateOne(sql, data);
    }

    deleteContent(cont:Content) {
        var sql: string = "DELETE FROM content WHERE id = ?";
        var data: any[] = [cont.id];
        
        return this.db.deleteOne(sql, data);
    }
}

export class Content {

    constructor(
        public name: string,
        public type: string,
        public path: string,
        public user: string,
        public timestamp: number,
        public id?: number
    ) {
        // console.log('constructor Product');
    }

    toArray(){
        return [this.name, this.type, this.path, this.user, this.timestamp];
    }
}