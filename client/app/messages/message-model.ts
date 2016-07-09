export interface IMessage {
    active: boolean;
    message: string;
    msg: string;
    id?: number;
    body:string
}

export class Message implements IMessage{
    title: string;
    active: boolean;
    selected: boolean = false;
    editable: boolean = false;
    message: string;
    msg: string;
    body:string;
    id:number;
    constructor (obj:IMessage) {
        for(var str in obj)this[str] = obj[str];
        this.title = this.msg;
    }
}