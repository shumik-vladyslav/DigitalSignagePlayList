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

export class Messages {

    // public id: number;
    // public activ: boolean;
    // public message: string;

    constructor(
        public activ: boolean,
        public message: string,
        public id?: number
    ) {
        // console.log('constructor Assets');
    }

}
