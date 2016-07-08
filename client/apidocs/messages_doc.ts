var get_api_1 = "/api/messages/select/all";

var get_api_2 = "/api/messages/select/:id";

var post_api_3 = "/api/messages/insert";

class Reqvest implements IMessage {
    activ: boolean;
    message: string;
    // id: number = 0;
}

export interface IMessage {
    active: boolean;
    message: string;
    id?: number;
}
