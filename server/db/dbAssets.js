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
        var sql2 = "CREATE TABLE assets (id INTEGER PRIMARY KEY AUTOINCREMENT, originalName TEXT, path TEXT, raw_data TEXT, path TEXT)";
        return this.db.createTable(sql1, sql2);
    };
    return DBAssets;
}());
exports.DBAssets = DBAssets;
var Assets = (function () {
    function Assets(raw_data, path, id) {
        this.raw_data = raw_data;
        this.path = path;
        this.id = id;
    }
    Assets.prototype.toArray = function () {
        return [this.raw_data, this.path];
    };
    return Assets;
}());
exports.Assets = Assets;
//# sourceMappingURL=dbAssets.js.map