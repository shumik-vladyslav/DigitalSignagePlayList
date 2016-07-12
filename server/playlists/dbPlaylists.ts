///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";


export class DBPlaylists {
    private db:IDBDriver;
    
    constructor(){
        this.db = new DBDriver();
    }
    
    deleteTable(): Q.Promise<any> {
        var sql = "DROP TABLE playlists";
        
        return this.db.deleteTable(sql);
    }

    createNewTable(): Q.Promise<any>  {
        var sql1 = "DROP TABLE playlists";
        var sql2 = "CREATE TABLE playlists (id INTEGER PRIMARY KEY AUTOINCREMENT, listId INTEGER, contentId INTEGER, duration INTEGER, afterId INTEGER)";

        return this.db.createTable(sql1, sql2);
    }

    selectAllContent() {
        var sql: string = "SELECT * FROM playlists";
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    selectContentById(id:number) {
        var sql: string = "SELECT * FROM playlists WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
    }

    selectMaxListId(playlist: Playlist) {
        var sql: string = "SELECT max"
    }

    insertContent(playlist: Playlist): Q.Promise<{id:number}> {
        var sql: string = 'INSERT INTO playlists (listId, contentId, duration, afterId) VALUES (?, ?, ?, ?)';
        var data: any[] = [playlist.listId, playlist.contentId, playlist.duration, playlist.afterId];

        return this.db.insertOne(sql, data);
    }

    updateContent(playlist: Playlist) {
        var sql: string = 'UPDATE messages SET activ = ?, message = ? WHERE id = ?';
        var data: any[] = [message.activ, message.message, message.id];

        return this.db.updateOne(sql, data);
    }

    deleteContent(message: Message) {
        var sql: string = "DELETE FROM messages WHERE id = ?";
        var data: any[] = [message.id];

        return this.db.deleteOne(sql, data);
    }
}

export class Playlist implements ISPlaylist {

    // public id: number;
    // public activ: boolean;
    // public message: string;

    constructor(
        public listId: number,
        public contentId: number,
        public duration: number,
        public afterId: number,
        public id?: number
    ) {
        // console.log('constructor Asset');
    }
}

interface ISPlaylist {
    listId: number,
    contentId: number,
    duration: number,
    afterId: number,
    id?: number
}