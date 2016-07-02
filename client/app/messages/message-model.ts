export class Message {
    title: string;
    active: boolean;

    constructor (title:string) {
        this.title = title;
        this.active = false;
    }
}