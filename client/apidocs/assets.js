"use strict";
var api = "assets/upload";
var form = "\n    <form name      =  \"uploadForm\"\n          id        =  \"uploadForm\"\n          enctype   =  \"multipart/form-data\"\n          action    =  \"/api/assets/upload\"\n          method    =  \"post\"\n    >\n        <input type=\"file\" name=\"userImages\" />\n        <input type=\"submit\" value=\"Upload Image\" name=\"submit\">\n    </form>\n    ";
var IUplResult = (function () {
    function IUplResult() {
    }
    return IUplResult;
}());
exports.IUplResult = IUplResult;
var IError = (function () {
    function IError() {
    }
    return IError;
}());
exports.IError = IError;
var Messages = (function () {
    // public id: number;
    // public activ: boolean;
    // public message: string;
    function Messages(activ, message, id) {
        this.activ = activ;
        this.message = message;
        this.id = id;
        // console.log('constructor Asset');
    }
    return Messages;
}());
exports.Messages = Messages;
//# sourceMappingURL=assets.js.map