"use strict";
var dbDriver_1 = require("../db/dbDriver");
var DBAssets = (function () {
    function DBAssets() {
        this.db = new dbDriver_1.DBDriver();
    }
    DBAssets.prototype.deleteTable = function () {
        var sql = "DROP TABLE assets";
        return this.db.deleteTable(sql);
    };
    DBAssets.prototype.createNewTable = function () {
        var sql1 = "DROP TABLE assets";
        var sql2 = "CREATE TABLE assets (id INTEGER PRIMARY KEY AUTOINCREMENT, originalName TEXT, path TEXT, thumb TEXT, size INTEGER, width INTEGER, height INTEGER, mime TEXT)";
        return this.db.createTable(sql1, sql2);
    };
    DBAssets.prototype.insertContent = function (assets) {
        var sql = 'INSERT INTO assets (originalName, path, thumb, size, width, height, mime) VALUES (?, ?, ?, ?, ?, ?, ?)';
        var data = [assets.originalName, assets.path, assets.thumb, assets.size, assets.width, assets.height, assets.mime];
        return this.db.insertOne(sql, data);
    };
    return DBAssets;
}());
exports.DBAssets = DBAssets;
var Assets = (function () {
    function Assets() {
    }
    return Assets;
}());
exports.Assets = Assets;
//# sourceMappingURL=dbAssets.js.map