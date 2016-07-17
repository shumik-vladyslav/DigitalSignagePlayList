/**
 * Created by Vlad on 7/16/2016.
 */
import {Component, OnInit, Input} from "@angular/core";
import {PlayerService} from "../services/player.service";
@Component({
    selector:'player-lite',
    template:`
        <h2>Player Lite id {{playervo.id}}</h2>       
         <h2>Screen {{screenid}}</h2>       
    `,
    providers:[PlayerService]
})
export class PlayerLite implements OnInit{
    @Input() playervo:PlayerVO;
    screenid:string;
    private _data:any;
    private _error:string;
    constructor(private service:PlayerService){

    }

    ngOnInit():void{
        console.log(this.playervo);
        this.screenid = PlayerVO.screenid;
      // this.service.getPlaylist(this.playerid).subscribe(data=>this._data=data, err=>this._error = err);
    }

}


export class PlayerVO{
    id:string;
    width:number;
    height:number;
    x:number;
    y:number;
    static screenid:string;
    constructor(obj:any){for(var str in obj) this[str] = obj[str]}
}
