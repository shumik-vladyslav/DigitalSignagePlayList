"use strict";
var dbDriver_1 = require("../db/dbDriver");
var TableModel = (function () {
    function TableModel(table, row) {
        this.table = table;
        this.row = row;
        this.db = new dbDriver_1.DBSQLite();
    }
    TableModel.prototype.getStucture = function () {
        var sql = "SELECT * FROM " + this.table + " limit 1";
        return this.db.selectAll(sql, []);
    };
    TableModel.prototype.deleteTable = function () {
        var sql = "DROP TABLE " + this.table;
        return this.db.deleteTable(sql);
    };
    TableModel.prototype.createNewTable = function () {
        var sql1 = "DROP TABLE " + this.table;
        var row = this.row;
        delete row['id'];
        var arr = [];
        for (var str in row) {
            if (typeof row[str] === "string")
                arr.push(str + " TEXT");
            else if (typeof row[str] === "number")
                arr.push(str + " INTEGER");
        }
        var sql2 = "CREATE TABLE " + this.table + " (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            arr.join(", ") + ")";
        return this.db.createTable(sql1, sql2);
    };
    TableModel.prototype.selectAllContent = function () {
        var sql = "SELECT * FROM " + this.table;
        var data = [];
        return this.db.selectAll(sql, data);
    };
    TableModel.prototype.selectContentById = function (id) {
        var sql = "SELECT * FROM " + this.table + " WHERE id = ?";
        var data = [id];
        return this.db.selectOne(sql, data);
    };
    TableModel.prototype.insertContent = function (row) {
        var ar1 = [];
        var ar2 = [];
        var ar3 = [];
        for (var str in row) {
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }
        var sql = 'INSERT INTO ' + this.table + ' (' + ar1.join(',') + ') VALUES (' + ar2.join(',') + ')';
        console.log('sql ', sql);
        var data = ar3;
        return this.db.insertOne(sql, data);
    };
    TableModel.prototype.updateContent = function (row) {
        var id = row.id;
        delete row.id;
        var ar1 = [];
        var ar2 = [];
        var ar3 = [];
        for (var str in row) {
            ar1.push(str + ' = ?');
            ar3.push(row[str]);
        }
        var sql = 'UPDATE ' + this.table + ' ' + ar1.join(',') + ' WHERE id = ' + id;
        var data = ar3;
        return this.db.updateOne(sql, data);
    };
    TableModel.prototype.deleteContent = function (row) {
        var sql = "DELETE FROM " + this.table + " WHERE id = " + row.id;
        var data = [];
        return this.db.deleteOne(sql, data);
    };
    return TableModel;
}());
exports.TableModel = TableModel;
//# sourceMappingURL=TableModel.js.map