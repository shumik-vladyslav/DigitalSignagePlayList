"use strict";
var Message = (function () {
    function Message(title) {
        this.title = title;
        this.active = false;
        this.selected = false;
        this.editable = false;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message-model.js.map