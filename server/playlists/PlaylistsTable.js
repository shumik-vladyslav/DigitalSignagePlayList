"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TableModel_1 = require("../db/TableModel");
var PlaylistsTable = (function (_super) {
    __extends(PlaylistsTable, _super);
    function PlaylistsTable(table, row) {
        _super.call(this, table, row);
        this.table = table;
        this.row = row;
    }
    PlaylistsTable.prototype.selectPlayListItemById = function (id) {
        var sql = "SELECT * FROM assets, " + this.table + " WHERE playlists.id = ? AND playlists.assetid = assets.id";
        var data = [id];
        return this.db.selectAll(sql, data);
    };
    PlaylistsTable.prototype.selectPlayListByListId = function (id) {
        var sql = "SELECT * FROM " + this.table + ", assets WHERE playlists.listid = ? AND playlists.assetid = assets.id";
        var data = [id];
        return this.db.selectAll(sql, data);
    };
    PlaylistsTable.prototype.selectMax = function (column_name) {
        var sql = "SELECT max(" + column_name + ") AS column_name FROM " + this.table;
        var data = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    };
    return PlaylistsTable;
}(TableModel_1.TableModel));
exports.PlaylistsTable = PlaylistsTable;
//# sourceMappingURL=PlaylistsTable.js.map