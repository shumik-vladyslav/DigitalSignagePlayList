///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";
import {IMessage} from "../../apidocs/messages_doc";


export class DBMessages {
    private db:IDBDriver;
    
    constructor(){
        this.db = new DBDriver();
    }
    
    deleteTable(): Q.Promise<any> {
        var sql = "DROP TABLE messages";
        
        return this.db.deleteTable(sql);
    }

    createNewTable(): Q.Promise<any>  {
        var sql1 = "DROP TABLE messages";
        var sql2 = "CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, activ BOOLEAN, message TEXT)";

        return this.db.createTable(sql1, sql2);
    }

    selectAllContent() {
        var sql: string = "SELECT * FROM messages";
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    selectContentById(id:number) {
        var sql: string = "SELECT * FROM messages WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
    }

    insertContent(message: Message): Q.Promise<{id:number}> {
        var sql: string = 'INSERT INTO messages (activ, message) VALUES (?, ?)';
        var data: any[] = [message.activ, message.message];

        return this.db.insertOne(sql, data);
    }

    updateContent(message: Message) {
        var sql: string = 'UPDATE messages SET activ = ?, message = ?';
        var data: any[] = [message.activ, message.message];

        return this.db.updateOne(sql, data);
    }

    deleteContent(message: Message) {
        var sql: string = "DELETE FROM messages WHERE id = ?";
        var data: any[] = [message.id];

        return this.db.deleteOne(sql, data);
    }
}

export class Message implements IMessage {

    // public id: number;
    // public activ: boolean;
    // public message: string;

    constructor(
        public activ: boolean,
        public message: string,
        public id?: number
    ) {
        // console.log('constructor Assets');
    }

}