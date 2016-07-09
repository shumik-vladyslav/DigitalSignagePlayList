"use strict";
var Message = (function () {
    function Message(obj) {
        this.selected = false;
        this.editable = false;
        for (var str in obj)
            this[str] = obj[str];
        this.title = this.msg;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message-model.js.map