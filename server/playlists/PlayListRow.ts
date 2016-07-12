
export class PlayListRow {

    id: number;
    listId: number;
    assetId: number;
    duration: number;
    afterId: number;

    static getInit(): PlayListRow {
        return new PlayListRow(
            {
                id : 0,
                listId: 0,
                assetId: 0,
                duration: 0,
                afterId: 0
            }
        );
    }
    
    constructor(obj: any) {
        for(var str in obj) this[str] = obj[str];
        // console.log('constructor Asset');
    }

}
