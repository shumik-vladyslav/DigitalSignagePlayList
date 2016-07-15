/**
 * Created by Vlad on 7/12/2016.
 */
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';

@Component({
    selector: 'multiple-progressbar',
    template:`
              <div class="wraper">
                <div class="wraper-tools {{ showtools }}">
                    <div class="btn btn-default upload-button">
    
                        <label for="files-pb" class="ui small black button icon">
                            <span class="ion-document-text icon"></span>
                            Browse
                        </label>
    
                        <input type="file"
                               id="files-pb"
                               style="display:none;"
                               [ng-file-select]="options"
                               name="userImages"
                               (onUpload)="handleUpload($event)"
                               multiple>
                    </div>
                    <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
                </div>
                <div class="progress-container {{ showprogress }}">
                    <div class="progress-window">
                        <div *ngFor="let progressObj of uploadProgresses">
                            <div>{{progressObj.originalName}}</div>
                            <div class="ui indicating olive progress">
                                <div class="bar" [style.width]="progressObj.percent + '%'"></div>
                                <div class="label">Uploading file ({{ progressObj.percent }}%)</div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-default" (click)="goBack()">Cancel</button>
                </div>
              </div>
                 
             `,
   directives: [UPLOAD_DIRECTIVES],
    styles:[`
               
            .wraper-tools {
                position: absolute;
                bottom: 20px;
                right: 20px;
            }
            
            .progress-window {
                height: 250px;
                overflow-y: auto;
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
    showtools:string = "show";
    uploadFiles: any[];
    uploadProgresses: any[] = [];
   // zone: NgZone;
    options: Object = {
        url: 'http://localhost:56777/proxy/api/assets/upload'
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
        let link = ['/content-manager'];
        this.router.navigate(link);
    }

}
