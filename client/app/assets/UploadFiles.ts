/**
 * Created by Vlad on 7/12/2016.
 */
import {Component, NgZone} from '@angular/core';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';


@Component({
    selector: 'multiple-progressbar',
    templateUrl: 'app/assets/multiple-progressbar.html',
    directives: [UPLOAD_DIRECTIVES],
    styles:[`
.olive{
background-color: olive;
}
.bar{
height: 30px;
background-color: red;
}
`]


})

export class UploadFiles {
    uploadFiles: any[];
    uploadProgresses: any[] = [];
    zone: NgZone;
    options: Object = {
        url: 'http://localhost:8888/api/assets/upload'
    };

    constructor() {
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    handleUpload(data:any): void {
        console.log(data);
        let id = data.id;
        let index = this.findIndex(id);
        if (index === -1) {
            this.uploadProgresses.push({id: id, percent: 0,originalName:data.originalName});
        }
        if (this.uploadProgresses[index]) {
            this.zone.run(() => {
                this.uploadProgresses[index].percent = data.progress.percent;
            });
        }
    }

    findIndex(id: string): number {
        return this.uploadProgresses.findIndex(x => x.id === id);
    }

}
