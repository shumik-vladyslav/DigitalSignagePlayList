///<reference path="../typings/sqlite3/sqlite3.d.ts"/>
///<reference path="../typings/q/Q.d.ts"/>

import {Database} from "sqlite3";
import Q = require('q');

export interface IDBDriver {
    runQuery(sql:string): Q.Promise<any>;

    deleteTable(sql:string): Q.Promise<any>;

    createTable(sql1:string, sql2:string): Q.Promise<any>;

    addColumn(sql:string, data?:any[]): Q.Promise<any>;

    deleteColumn(sql:string, data?:any[]): Q.Promise<any>;

    selectAll(sql:string, data?:any[]): Q.Promise<any>;

    selectOne(sql:string, data?:any[]): Q.Promise<any>;

    updateAll(sql:string, data?:any[]): Q.Promise<any>;

    updateOne(sql:string, data?:any[]): Q.Promise<any>;

    insertAll(sql:string, data?:any[]): Q.Promise<any>;

    insertOne(sql:string, data?:any[]): Q.Promise<any>;

    deleteAll(sql:string, data?:any[]): Q.Promise<any>;

    deleteOne(sql:string, data?:any[]): Q.Promise<any>;
}

export class DBDriver implements IDBDriver {

    private db:DBSQLite;

    constructor(){
        this.db = new DBSQLite();
    }

    runQuery(sql:string): Q.Promise<any> {
        return this.db.runQuery(sql);
    }

    deleteTable(sql:string): Q.Promise<any> {
        return this.db.deleteTable(sql);
    }

    createTable(sql1:string, sql2:string): Q.Promise<any> {
        return this.db.createTable(sql1, sql2);
    }

    addColumn(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.addColumn(sql, data);
    }

    deleteColumn(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.deleteColumn(sql, data);
    }

    selectAll(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.selectAll(sql,data);
    }

    selectOne(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.selectOne(sql, data);
    }

    updateAll(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.updateAll(sql, data);
    }

    updateOne(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.updateOne(sql, data);
    }

    insertAll(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.insertAll(sql, data);
    }

    insertOne(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.insertOne(sql, data);
    }

    deleteAll(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.deleteAll(sql, data);
    }

    deleteOne(sql:string, data?:any[]): Q.Promise<any> {
        return this.db.deleteOne(sql, data);
    }
}

export class DBSQLite implements IDBDriver {
    private db;

    constructor(){
        var sqlite: any = require('sqlite3').verbose();
        this.db = new sqlite.Database('./server/db/ads.db');
    }

    runQuery(sql: string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        // console.log('dbDriver runQuery');
        this.db.run(sql, function(error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log('runQuery this ',this);
                deferred.resolve(this);
            }
        });

        return deferred.promise;
    }

    deleteTable(sql:string) {
        var deferred: Q.Deferred<any> = Q.defer();

        var p: Q.Promise<any>  = this.runQuery(sql);

        p.then(function (val) {
            console.log('table was deleted');
            console.log(val);
            deferred.resolve(val);
        }, function (err) {
            console.log('table was not deleted');
            console.log(err);
            deferred.reject(err);
        });

        return deferred.promise;
    }

    createTable(sql1:string, sql2:string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        // console.log('dbDriver createTable');
        var self: IDBDriver = this;
        var p: Q.Promise<any>  = this.runQuery(sql1);

        p.then(function (val) {
            var p2: Q.Promise<any> = self.runQuery(sql2);

            p2.then(function (val) {
                deferred.resolve(val);
            }, function (err) {
                deferred.reject(err);
            })
        }, function (err) {
            var p2: Q.Promise<any> = self.runQuery(sql2);

            p2.then(function (val) {
                deferred.resolve(val);
            }, function (err) {
                deferred.reject(err);
            })
        });

        return deferred.promise;
    }

    addColumn(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.run(sql, function(error) {
            if (error) {
                console.log(error);
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }

    deleteColumn(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.run(sql, data, function(error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }

    selectAll(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.all(sql, data, (error, rows) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    }

    selectOne(sql:string, data?:any[]):Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.get(sql, data, function(error, row) {
                if (error) {
                    console.log(error);
                    deferred.reject({
                        errno: error.errno,
                        code: error.code
                    });
                } else {
                    // console.log(rows);
                    deferred.resolve(row);
                }
            });
        return deferred.promise;
    }
    
    insertAll(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        return deferred.promise;
    }

    insertOne(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.run(sql, data, function(error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ id: this.lastID });
            }
        });

        return deferred.promise;
    }

    updateAll(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        return deferred.promise;
    }

    updateOne(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.run(sql, data, function(error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log({ changes: this.changes });
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }

    deleteAll(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        return deferred.promise;
    }

    deleteOne(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.db.run(sql, data, function(error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }
}