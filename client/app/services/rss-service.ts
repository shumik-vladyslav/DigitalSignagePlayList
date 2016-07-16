/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

export class RSSItem {
    title:number;
    content: string;
    link: string;
    data: string;
    time:string;
    constructor(obj:any){
        for(var str in obj)this[str] = obj[str];
    }
}  

@Injectable()
export class RSSService {
    constructor(private http:Http) {
    }


    private dataUrl = 'api/rss/';

    getData (url:string): Observable<RSSItem[]> {
        return this.http.get(this.dataUrl+encodeURIComponent(url))
            .map( (data) => this.parse (data))
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body: RSSItem [] = res.json().data;
        var out:RSSItem[] = [];
        body.map(function(item){ out.push(new RSSItem(item))});
        return out;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}