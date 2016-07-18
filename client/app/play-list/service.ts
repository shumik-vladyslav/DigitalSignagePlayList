
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

export class Asset {
    id:number;
    thumb: string;
    img: string;
    spacer: boolean;
}

@Injectable()
export class PlayListService {
    constructor(private http:Http) {
    }


    private dataUrl = 'api/assets/select-all';
    private playListUrl = 'api/playlists';

    getData (): Observable<Asset[]> {
        return this.http.get(this.dataUrl)
            .map( (data) => this.parse (data))
            .catch(this.handleError);
    }
//Observable<Asset>
    addItem (listId: number, assetId: number, afterId: number, duration: number) {
        // let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            "listId": listId,
            "assetId": assetId,
            "afterId": afterId,
            "duration": duration
        }
        console.log(body)

        this.http.post(this.playListUrl+"/insert-content", body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body: Asset [] = res.json().data;
         // console.log(body)
        body.forEach (function (item: any) {
            item.thumb =  item.img = item.path;


        });
        return body || { };
    }

    private parseOne(res: Response) {
        let body = res.json();
        console.log(body)

        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}