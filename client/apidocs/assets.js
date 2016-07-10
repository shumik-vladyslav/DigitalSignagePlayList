"use strict";
var api = "assets/upload";
var form = `
    <form name      =  "uploadForm"
          id        =  "uploadForm"
          enctype   =  "multipart/form-data"
          action    =  "/api/assets/upload"
          method    =  "post"
    >
        <input type="file" name="userImages" />
        <input type="submit" value="Upload Image" name="submit">
    </form>
    `;
class IUplResult {
}
exports.IUplResult = IUplResult;
class IError {
}
exports.IError = IError;
class Messages {
    // public id: number;
    // public activ: boolean;
    // public message: string;
    constructor(activ, message, id) {
        this.activ = activ;
        this.message = message;
        this.id = id;
        // console.log('constructor Assets');
    }
}
exports.Messages = Messages;
//# sourceMappingURL=assets.js.map