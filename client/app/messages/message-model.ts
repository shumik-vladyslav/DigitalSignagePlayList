export interface IMessage {
    active: boolean;
    message: string;
    msg: string;
    id?: number;
}

export class Message implements IMessage{
    title: string;
    active: boolean;
    selected: boolean;
    editable: boolean;
    message: string;
    msg: string;

    constructor (active:boolean, title:string) {
        this.title = title;
        this.active = active;
        this.selected = false;
        this.editable = false;
    }
}