"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TableModel_1 = require("../db/TableModel");
var AssetTable = (function (_super) {
    __extends(AssetTable, _super);
    function AssetTable(table, row) {
        _super.call(this, table, row);
        this.table = table;
        this.row = row;
    }
    return AssetTable;
}(TableModel_1.TableModel));
exports.AssetTable = AssetTable;
//# sourceMappingURL=AssetTable.js.map