"use strict";
var PlayList = (function () {
    function PlayList(obj) {
        if (obj) {
            for (var str in obj) {
                if (PlayList[str])
                    this[str] = obj[str];
            }
        }
    }
    PlayList.id = 1;
    PlayList.listId = 1;
    PlayList.assetId = 1;
    PlayList.duration = 1;
    PlayList.afterId = 1;
    return PlayList;
}());
exports.PlayList = PlayList;
//# sourceMappingURL=PlayListRow.js.map