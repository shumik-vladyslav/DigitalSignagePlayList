
import {TableModel} from "../db/TableModel";

export class AssetTable extends TableModel {

    constructor(public table: string, public row: any){
        super(table, row);
    }
}