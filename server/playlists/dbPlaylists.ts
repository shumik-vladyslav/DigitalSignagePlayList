///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";


export class DBPlaylists extends TableModel {

    constructor(public table: string, public row: any){
        super(table, row);
    }

    selectMaxListId(playlist: Playlist) {
        var sql: string = "SELECT max"
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