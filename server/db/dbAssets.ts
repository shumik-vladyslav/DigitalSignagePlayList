///<reference path="../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
import {IDBDriver} from "../db/dbDriver";


export class DBAssets {
    private db:IDBDriver;
    
    constructor(){
        this.db = new DBDriver();
    }

}