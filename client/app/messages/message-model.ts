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

    constructor (title:string) {
        this.title = title;
        this.active = false;
        this.selected = false;
        this.editable = false;
    }
}