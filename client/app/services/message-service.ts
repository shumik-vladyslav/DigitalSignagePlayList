/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IMessage, Message } from '../messages/message-model';
import { Observable } from 'rxjs/Observable';

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

    saveMessages (name: IMessage[]): Observable<Message[]> {
        name.forEach (function (item:Message) {
            item.msg = item.title;
        })
        let body = JSON.stringify(name, ["msg", "active"]);
        return this.http.post(this.messagesUrl, body)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body:IMessage [] = res.json();
        let out:Message [] = [];
        body.forEach (function (item:Message) {
            out.push(new Message (item.active, item.msg))
        });
        return out;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}