export class Message {
    title: string;
    active: boolean;
    selected: boolean;
    editable: boolean;

    constructor (title:string) {
        this.title = title;
        this.active = false;
        this.selected = false;
        this.editable = false;
    }
}