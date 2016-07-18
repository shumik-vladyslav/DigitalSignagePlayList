///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBSQLite} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";
import {TableModel} from "../db/TableModel";
import {PlayList} from "./PlayListRow";


export class PlaylistsTable extends TableModel {

    constructor(public table: string, public row: any){
        super(table, row);
    }

    selectPlayListById(id:number): Q.Promise<ISPlayListItem> {
        console.log(id)
        var sql: string = "SELECT * FROM " + this.table + " WHERE id = "+ id;
        var data: any[] = [id];

        return this.db.selectAll(sql, data);
    }

    selectPlayListItemById(id:number): Q.Promise<ISPlayListItem> {
        var sql: string = "SELECT * FROM assets, " + this.table + " WHERE playlists.id = ? AND playlists.assetid = assets.id";
        var data: any[] = [id];

        return this.db.selectAll(sql, data);
    }

    selectPlayListItemByListId(id:number): Q.Promise<ISPlayListItem[]> {
        var sql: string = "SELECT * FROM " + this.table + ", assets WHERE playlists.listid = ? AND playlists.assetid = assets.id";
        var data: any[] = [id];

        return this.db.selectAll(sql, data);
    }

    selectMax(column_name: string): Q.Promise<{column_name:number}> {
        var sql: string = "SELECT max(" + column_name + ") AS " + column_name + " FROM " + this.table;
        var data: any[] = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    }
}

export interface ISPlayListItem {
    id: number;
    listId: number;
    assetId: number;
    duration: number;
    afterId: number;
    originalName: string;
    path: string;
    thumb: string;
    size: number;
    width: number;
    height: number;
    mime: string;
    orientation: string;
    active: number;
    orig_duration: number;
}