/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Message } from '../messages/message-model';
import { Observable } from 'rxjs/Observable';

interface IMsg {
    msg: string;
    active: boolean;
}

interface IMyMsg extends IMsg{
    title: string;
}

@Injectable()
export class MessageService {
    constructor(private http:Http) {
    }

    private messagesUrl = 'http://localhost/GitHub/tableblue-master/crawl/crawl.php';

    getMessages (): Observable<Message[]> {
        return this.http.get(this.messagesUrl)
            .map(this.parse)
            .catch(this.handleError);
    }

    addMessage (name: Message): Observable<Message> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.messagesUrl, body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body:IMyMsg [] = res.json();
        body.forEach (function (item:IMyMsg) {
            item.title = item.msg;
        })

        return body || { };
    }

    private parseOne(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}