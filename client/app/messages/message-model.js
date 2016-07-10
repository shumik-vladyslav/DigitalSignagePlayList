"use strict";
class Message {
    constructor(obj) {
        this.selected = false;
        this.editable = false;
        for (var str in obj)
            this[str] = obj[str];
        if (this.id && this.id > Message.count)
            Message.count = this.id;
        if (!this.id)
            this.id = Message.count++;
    }
}
Message.count = 1;
exports.Message = Message;
//# sourceMappingURL=message-model.js.map