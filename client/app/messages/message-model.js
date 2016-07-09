"use strict";
var Message = (function () {
    function Message(active, title) {
        this.title = title;
        this.active = active;
        this.selected = false;
        this.editable = false;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message-model.js.map