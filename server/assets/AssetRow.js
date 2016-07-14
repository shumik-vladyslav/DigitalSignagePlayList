"use strict";
var Asset = (function () {
    function Asset(obj) {
        for (var str in obj)
            this[str] = obj[str];
    }
    Asset.getInit = function () {
        return new Asset({
            id: 0,
            originalName: 'string',
            path: 'string',
            thumb: 'string',
            size: 0,
            width: 0,
            height: 0,
            mime: 'string',
            orientation: 'string',
            active: 0,
            orig_duration: 0
        });
    };
    return Asset;
}());
exports.Asset = Asset;
//# sourceMappingURL=AssetRow.js.map