///<reference path="../typings/sqlite3/sqlite3.d.ts"/>
///<reference path="../typings/q/Q.d.ts"/>
"use strict";
var Q = require('q');
var DBDriver = (function () {
    function DBDriver() {
        this.db = new DBSQLite();
    }
    DBDriver.prototype.runQuery = function (sql) {
        return this.db.runQuery(sql);
    };
    DBDriver.prototype.deleteTable = function (sql) {
        return this.db.deleteTable(sql);
    };
    DBDriver.prototype.createTable = function (sql1, sql2) {
        return this.db.createTable(sql1, sql2);
    };
    DBDriver.prototype.addColumn = function (sql, data) {
        return this.db.addColumn(sql, data);
    };
    DBDriver.prototype.deleteColumn = function (sql, data) {
        return this.db.deleteColumn(sql, data);
    };
    DBDriver.prototype.selectAll = function (sql, data) {
        return this.db.selectAll(sql, data);
    };
    DBDriver.prototype.selectOne = function (sql, data) {
        return this.db.selectOne(sql, data);
    };
    DBDriver.prototype.updateAll = function (sql, data) {
        return this.db.updateAll(sql, data);
    };
    DBDriver.prototype.updateOne = function (sql, data) {
        return this.db.updateOne(sql, data);
    };
    DBDriver.prototype.insertAll = function (sql, data) {
        return this.db.insertAll(sql, data);
    };
    DBDriver.prototype.insertOne = function (sql, data) {
        return this.db.insertOne(sql, data);
    };
    DBDriver.prototype.deleteAll = function (sql, data) {
        return this.db.deleteAll(sql, data);
    };
    DBDriver.prototype.deleteOne = function (sql, data) {
        return this.db.deleteOne(sql, data);
    };
    return DBDriver;
}());
exports.DBDriver = DBDriver;
var DBSQLite = (function () {
    function DBSQLite() {
        var sqlite = require('sqlite3').verbose();
        this.db = new sqlite.Database('./server/db/ads.db');
    }
    DBSQLite.prototype.runQuery = function (sql) {
        var deferred = Q.defer();
        // console.log('dbDriver runQuery');
        this.db.run(sql, function (error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log('runQuery this ',this);
                deferred.resolve(this);
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.deleteTable = function (sql) {
        var deferred = Q.defer();
        var p = this.runQuery(sql);
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
    };
    DBSQLite.prototype.createTable = function (sql1, sql2) {
        var deferred = Q.defer();
        // console.log('dbDriver createTable');
        var self = this;
        var p = this.runQuery(sql1);
        p.then(function (val) {
            var p2 = self.runQuery(sql2);
            p2.then(function (val) {
                deferred.resolve(val);
            }, function (err) {
                deferred.reject(err);
            });
        }, function (err) {
            var p2 = self.runQuery(sql2);
            p2.then(function (val) {
                deferred.resolve(val);
            }, function (err) {
                deferred.reject(err);
            });
        });
        return deferred.promise;
    };
    DBSQLite.prototype.addColumn = function (sql, data) {
        var deferred = Q.defer();
        this.db.run(sql, function (error) {
            if (error) {
                console.log(error);
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.deleteColumn = function (sql, data) {
        var deferred = Q.defer();
        this.db.run(sql, data, function (error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.selectAll = function (sql, data) {
        var deferred = Q.defer();
        this.db.all(sql, data, function (error, rows) {
            if (error) {
                console.log(error);
                deferred.reject(error);
            }
            else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.selectOne = function (sql, data) {
        var deferred = Q.defer();
        this.db.get(sql, data, function (error, row) {
            if (error) {
                console.log(error);
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log(rows);
                deferred.resolve(row);
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.insertAll = function (sql, data) {
        var deferred = Q.defer();
        return deferred.promise;
    };
    DBSQLite.prototype.insertOne = function (sql, data) {
        var deferred = Q.defer();
        this.db.run(sql, data, function (error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ id: this.lastID });
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.updateAll = function (sql, data) {
        var deferred = Q.defer();
        return deferred.promise;
    };
    DBSQLite.prototype.updateOne = function (sql, data) {
        var deferred = Q.defer();
        this.db.run(sql, data, function (error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log({ changes: this.changes });
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    DBSQLite.prototype.deleteAll = function (sql, data) {
        var deferred = Q.defer();
        return deferred.promise;
    };
    DBSQLite.prototype.deleteOne = function (sql, data) {
        var deferred = Q.defer();
        this.db.run(sql, data, function (error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    return DBSQLite;
}());
exports.DBSQLite = DBSQLite;
//# sourceMappingURL=dbDriver.js.map