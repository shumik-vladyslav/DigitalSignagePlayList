///<reference path="../typings/q/Q.d.ts"/>
"use strict";
var dbDriver_1 = require("../db/dbDriver");
var DBAssets = (function () {
    function DBAssets() {
        this.db = new dbDriver_1.DBDriver();
    }
    return DBAssets;
}());
exports.DBAssets = DBAssets;
//# sourceMappingURL=dbAssets.js.map