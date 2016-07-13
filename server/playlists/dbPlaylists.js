"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DBPlaylists = (function (_super) {
    __extends(DBPlaylists, _super);
    function DBPlaylists(table, row) {
        _super.call(this, table, row);
        this.table = table;
        this.row = row;
    }
    DBPlaylists.prototype.selectMaxListId = function (playlist) {
        var sql = "SELECT max";
    };
    return DBPlaylists;
}(TableModel));
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