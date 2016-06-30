///<reference path="../typings/q/Q.d.ts"/>

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
        var sql2 = "CREATE TABLE assets (id INTEGER PRIMARY KEY AUTOINCREMENT, raw_data TEXT, path TEXT)";

        return this.db.createTable(sql1, sql2);
    }

}

export class Assets {

    constructor(
        public raw_data:string,
        public path:string,
        public id?:number) {
        // console.log('constructor Assets');
    }

    toArray() {
        return [this.raw_data, this.path];
    }
}