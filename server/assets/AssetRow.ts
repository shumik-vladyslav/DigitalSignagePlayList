
export class Asset {

    id :number;
    originalName: string;
    path:string;
    thumb:string;
    size: number;
    width: number;
    height: number;
    mime: string;
    orientation: string;
    active: number;
    duration: number;

    static getInit(): Asset {
        return new Asset(
            {
                id : 0,
                originalName: 'string',
                path: 'string',
                thumb:'string',
                size: 0,
                width: 0,
                height: 0,
                mime: 'string',
                orientation: 'string',
                active: 0,
                duration: 0
            }
        );
    }


    constructor(obj: any) {
        for(var str in obj) this[str] = obj[str];
        // console.log('constructor Asset');
    }

}