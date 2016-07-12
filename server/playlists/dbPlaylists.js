"use strict";
var dbDriver_1 = require("../db/dbDriver");
var DBPlaylists = (function () {
    function DBPlaylists() {
        this.db = new dbDriver_1.DBDriver();
    }
    DBPlaylists.prototype.deleteTable = function () {
        var sql = "DROP TABLE playlists";
        return this.db.deleteTable(sql);
    };
    DBPlaylists.prototype.createNewTable = function () {
        var sql1 = "DROP TABLE playlists";
        var sql2 = "CREATE TABLE playlists (id INTEGER PRIMARY KEY AUTOINCREMENT, listId INTEGER, contentId INTEGER, duration INTEGER, afterId INTEGER)";
        return this.db.createTable(sql1, sql2);
    };
    DBPlaylists.prototype.selectAllContent = function () {
        var sql = "SELECT * FROM playlists";
        var data = [];
        return this.db.selectAll(sql, data);
    };
    DBPlaylists.prototype.selectContentById = function (id) {
        var sql = "SELECT * FROM playlists WHERE id = ?";
        var data = [id];
        return this.db.selectOne(sql, data);
    };
    DBPlaylists.prototype.selectMaxListId = function (playlist) {
        var sql = "SELECT max";
    };
    DBPlaylists.prototype.insertContent = function (playlist) {
        var sql = 'INSERT INTO playlists (listId, contentId, duration, afterId) VALUES (?, ?, ?, ?)';
        var data = [playlist.listId, playlist.contentId, playlist.duration, playlist.afterId];
        return this.db.insertOne(sql, data);
    };
    DBPlaylists.prototype.updateContent = function (playlist) {
        var sql = 'UPDATE messages SET activ = ?, message = ? WHERE id = ?';
        var data = [message.activ, message.message, message.id];
        return this.db.updateOne(sql, data);
    };
    DBPlaylists.prototype.deleteContent = function (message) {
        var sql = "DELETE FROM messages WHERE id = ?";
        var data = [message.id];
        return this.db.deleteOne(sql, data);
    };
    return DBPlaylists;
}());
exports.DBPlaylists = DBPlaylists;
var Playlist = (function () {
    function Playlist(listId, contentId, duration, afterId, id) {
        this.listId = listId;
        this.contentId = contentId;
        this.duration = duration;
        this.afterId = afterId;
        this.id = id;
    }
    return Playlist;
}());
exports.Playlist = Playlist;
//# sourceMappingURL=dbPlaylists.js.map