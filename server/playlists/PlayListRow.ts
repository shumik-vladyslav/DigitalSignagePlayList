
export class PlayList implements ISPlayList{

    id: number;
    listId: number;
    assetId: number;
    duration: number;
    afterId: number;

    static id: number = 1;
    static listId: number = 1;
    static assetId: number = 1;
    static duration: number = 1;
    static afterId: number = 1;

    // static getInit(): PlayList {
    //     return new PlayList(
    //         {
    //             id : 1,
    //             listId: 1,
    //             assetId: 1,
    //             duration: 1,
    //             afterId: 1
    //         }
    //     );
    // }

    constructor(obj?: any) {
        if(obj) {
            for(var str in obj) {
                if(PlayList[str]) this[str] = obj[str];
            }
        }
        // console.log('constructor Asset');
    }
}

export interface ISPlayList {
    id: number;
    listId: number;
    assetId: number;
    duration: number;
    afterId: number;
}