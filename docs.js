var upload;
(function (upload) {
    var api = "assets/upload";
    var form = "\n        <form name      =  \"uploadForm\"\n              id        =  \"uploadForm\"\n              enctype   =  \"multipart/form-data\"\n              action    =  \"/api/assets/upload\"\n              method    =  \"post\"\n        >\n            <input type=\"file\" name=\"userImages\" />\n            <input type=\"submit\" value=\"Upload Image\" name=\"submit\">\n        </form>\n        ";
    var IUplResult = (function () {
        function IUplResult() {
        }
        return IUplResult;
    }());
    upload.IUplResult = IUplResult;
    var IError = (function () {
        function IError() {
        }
        return IError;
    }());
    upload.IError = IError;
})(upload || (upload = {}));
//# sourceMappingURL=docs.js.map