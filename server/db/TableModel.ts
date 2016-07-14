///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBSQLite} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";


export class TableModel {

    public db:IDBDriver;
    
    constructor(public table: string, public row: any){
        this.db = new DBSQLite();
    }

    getStucture(){
        var sql: string = "SELECT * FROM " + this.table + " limit 1";
        // var data: any[] = [];
        return this.db.selectAll(sql, []);
    }
    
    deleteTable(): Q.Promise<any> {
        var sql = "DROP TABLE " + this.table;
        
        return this.db.deleteTable(sql);
    }

    createNewTable(): Q.Promise<any>  {
        var sql1 = "DROP TABLE " + this.table;
        var row = this.row;
        delete row['id'];
        var arr: string[] = [];

        for(var str in row){
            if(typeof row[str] === "string") arr.push(str + " TEXT")
            else if(typeof row[str] === "number") arr.push(str + " INTEGER")
        }

        var sql2 = "CREATE TABLE " + this.table + " (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                arr.join(", ") + ")";
        return this.db.createTable(sql1, sql2);
    }

    selectAllContent() {
        var sql: string = "SELECT * FROM " + this.table;
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    selectContentById(id:number): Q.Promise<any> {
        var sql: string = "SELECT * FROM " + this.table + " WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
    }

    insertContent(row:any): Q.Promise<{id:number}> {
        // console.log('row', row);
        var ar1:string[] = [];
        var ar2:string[] = [];
        var ar3:any[]    = [];
        for(var str in row){
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }

        var sql: string = 'INSERT INTO '+this.table+' ('+ar1.join(',')+') VALUES ('+ar2.join(',')+')';
        console.log('sql ', sql);
        var data: any[] = ar3;

        return this.db.insertOne(sql, data);
    }

    updateContent(row:any): Q.Promise<{changes:number}>{

        var id = row.id;
        delete row.id;

        var ar1:string[] = [];
        var ar2:string[] = [];
        var ar3:any[] = [];
        for(var str in row){
            ar1.push(str + ' = ?');
            ar3.push(row[str]);
        }

        var sql: string = 'UPDATE '+ this.table + ' SET '+ar1.join(', ')+' WHERE id = ' + id;
        console.log('sql ', sql);
        var data: any[] = ar3;

        return this.db.updateOne(sql, data);
    }

    deleteContent(row:any): Q.Promise<{affected:number}> {

        var sql: string = "DELETE FROM " + this.table + " WHERE id = " + row.id;
        var data: any[] = [];

        return this.db.deleteOne(sql, data);
    }

}