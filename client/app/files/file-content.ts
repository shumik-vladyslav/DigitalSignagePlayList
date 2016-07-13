/**
 * Created by Vlad on 7/12/2016.
 */
import {Component, NgZone} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';


@Component({
    selector: 'multiple-progressbar',
    template:`
        <div>
            <br>
            <label for="files-pb" class="ui small black button right icon upload-button">
                <i class="ion-document-text icon"></i>
                Browse
            </label>
            <br>
            <input type="file"
                   id="files-pb"
                   style="display:none;"
                   [ng-file-select]="options"
                   name="userImages"
                   (onUpload)="handleUpload($event)"
                   multiple>
        </div>
        <div class="ui divider"></div>
        <div *ngFor="let progressObj of uploadProgresses">
            <div>{{progressObj.originalName}}</div>
            <div class="ui indicating olive progress">
                <div class="bar" [style.width]="progressObj.percent + '%'"></div>
                <div class="label">Uploading file ({{ progressObj.percent }}%)</div>
            </div>
        </div>
        <br>
        <!--<button type="submit" class="btn btn-default">Upload</button>-->
        <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
        `,
   directives: [UPLOAD_DIRECTIVES, ROUTER_DIRECTIVES],
    styles:[`
            .button {
                color: #333;
                background-color: #fff;
                display: inline-block;
                padding: 6px 12px;
                margin-bottom: 0;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.42857143;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                -ms-touch-action: manipulation;
                touch-action: manipulation;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px
            }
            
            .button:hover {
                background-color: #e6e6e6;
                border-color: #adadad;
            }
            
            .olive {
                height: 10px;
                background-color: olive;
            }
            
            .bar{
                height: 10px;
                background-color: red;
            }
    `]
})

export class FileContent {
    uploadFiles: any[];
    uploadProgresses: any[] = [];
   // zone: NgZone;
    options: Object = {
        url: 'http://localhost:8888/api/assets/upload'
    };

    constructor(private zone:NgZone,  private router: Router) {
       // this.zone = new NgZone({ enableLongStackTrace: false });
    }

    handleUpload(data:any): void {
       // console.log(data);
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

    goBack() {
        let link = ['/dashboard/content-manager'];
        this.router.navigate(link);
    }

}
