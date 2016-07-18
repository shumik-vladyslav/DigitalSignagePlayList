"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var message_model_1 = require('./message-model');
var MessageTools = (function () {
    function MessageTools() {
        this.deleted = new core_1.EventEmitter();
        this.added = new core_1.EventEmitter();
        this.saved = new core_1.EventEmitter();
    }
    MessageTools.prototype.add = function (title) {
        this.added.emit(new message_model_1.Message({ active: true, body: title }));
    };
    MessageTools.prototype.del = function () {
        this.deleted.emit(null);
    };
    MessageTools.prototype.save = function () {
        this.saved.emit(null);
    };
    __decorate([
        core_1.Input()
    ], MessageTools.prototype, "message");
    __decorate([
        core_1.Input()
    ], MessageTools.prototype, "messages");
    __decorate([
        core_1.Output()
    ], MessageTools.prototype, "deleted");
    __decorate([
        core_1.Output()
    ], MessageTools.prototype, "added");
    __decorate([
        core_1.Output()
    ], MessageTools.prototype, "saved");
    MessageTools = __decorate([
        core_1.Component({
            selector: 'message-tools',
            templateUrl: 'app/messages/message-tools.html',
            styles: [".tools > div {\n        display: inline-block;\n    }"]
        })
    ], MessageTools);
    return MessageTools;
}());
exports.MessageTools = MessageTools;
//# sourceMappingURL=message-tools.js.map