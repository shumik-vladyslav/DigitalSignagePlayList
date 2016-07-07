module upload {
    var api = "assets/upload";

    var form =
        `
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

    export class IUplResult {
        success: string;
        result: {
            insertId: number;   // id in DB
            thumbPath: string;  // path to thumbnail
            imagePath: string;  // path to original image
        }
    }

    export class IError {
        error: string;
        reason: any
    }
}

