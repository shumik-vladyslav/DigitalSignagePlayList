"use strict";
var PlayListRow = (function () {
    function PlayListRow(obj) {
        for (var str in obj)
            this[str] = obj[str];
    }
    PlayListRow.getInit = function () {
        return new PlayListRow({
            id: 0,
            listId: 0,
            assetId: 0,
            duration: 0,
            afterId: 0
        });
    };
    return PlayListRow;
}());
exports.PlayListRow = PlayListRow;
//# sourceMappingURL=PlayListRow.js.map