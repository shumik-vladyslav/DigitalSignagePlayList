/**
 * Created by Vlad on 7/16/2016.
 */
import {Component, OnInit} from "@angular/core";
import {PlayerService} from "../services/player.service";
@Component({
    selector:'player-lite',
    template:`
        <h2>Player Lite</h2>
    `,
    providers:[PlayerService]
})
export class PlayerLite implements OnInit{
   private _data:any;
    private _error:string;
    constructor(private service:PlayerService){

    }

    ngOnInit():void{
       // this.service.getPlaylist('a').subscribe(data=>this._data=data, err=>this._error = err);
    }

}