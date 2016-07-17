/**
 * Created by Vlad on 7/16/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";




@Injectable()
export class PlayerService{
    playlistId:string;
    screenid:string;
    currentItem:PlaylistItem;

    constructor(private http:Http){
        }

        setIds(playlisid:string,screenid:string):void{
            this.playlistId = playlisid;
            this.screenid = screenid;
        }


        getPlaylist(playlistid:string):Observable<PlaylistItem[]>{
            this.playlistId = playlistid;
           return this.loadData();
        }

        private loadData():Observable<PlaylistItem[]>{
            return this.http.get('api/get-playlist/'+this.playlistId)
                .map((data) => this.parse (data))
                .catch(this.handleError);
        }

        private parse(data:any):PlaylistItem[]{
            var out:PlaylistItem[] =[];
            return out;
        }
        private handleError (error: any) {
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
            return Observable.throw(errMsg);
        }
}

export class PlaylistItem{

}
