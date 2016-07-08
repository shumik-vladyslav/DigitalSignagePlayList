///<reference path="../../node_modules/rxjs/add/operator/catch.d.ts"/>
/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Message } from './message-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {
    constructor(private http:Http) {
    }

    private messagesUrl = 'http://front-desk.ca/tableblue/agents/getagents.php';

    getMessages (): Observable<Message[]> {
        return this.http.get(this.messagesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addMessage (name: string): Observable<Message> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.messagesUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        console.log(res);
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
