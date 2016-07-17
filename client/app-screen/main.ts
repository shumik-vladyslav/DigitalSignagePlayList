/**
 * Created by Vlad on 6/28/2016.
 */
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {Component, OnInit, Inject} from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import './rxjs-operators';
import { provideRouter, RouterConfig } from '@angular/router';
import { MessagesMain } from '../app/messages/messages-main';
import { AssetsMain } from '../app/assets/assets-main';
import {PlayerLite, PlayerVO} from "./player-lite/index";
import {DefaultController} from "./DefaultController";
import {UtilsServices} from "./services/UtilsServices";
//import {RouteParams} from "@angular/router-deprecated";
//import {RouteParams} from "@angular/router-deprecated";






export const routes: RouterConfig = [
    { path: '', component:DefaultController },
   // { path: 'assets', component: AssetsMain },
    /*{ path: 'assets/upload', component:UploadFiles},
     { path: 'files/upload', component:UploadFiles},*!/*/
   // { path: 'messages', component: MessagesMain},
    /*    { path: 'table', component:TableComponent },
     { path: 'agents', component:AgentsManager },
     { path: '**', redirectTo: '/dashboard/messages' }*/
]


export const screenRouterProviders = [
    provideRouter(routes)
];

@Component({
    selector: 'my-screen',
    template: `   
     <player-lite *ngFor="let player of players"  [playervo]="player"  ></player-lite>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES,PlayerLite],
    providers:[UtilsServices]
})
export class ScreenComponent implements OnInit{
    players:PlayerVO[];

   constructor(private utils:UtilsServices,private http:Http) {
   }

    ngOnInit():void{

        var params = this.utils.getUrlParams(window.location.href);

        this.screenid = params.screenid;
        PlayerVO.screenid =this.screenid;
            this.http.get('serverdata/screen_'+this.screenid+'.json').map((res)=>{
            let out:PlayerVO[] =[]
           res.json().data.forEach(function(item){ out.push(new PlayerVO(item))})
            return out
        }).subscribe(data=>this.players = <PlayerVO[]>data,error=>console.log(error),()=>console.log('Done'));

       console.log(params);

    }
    screenid:string;

}


bootstrap(ScreenComponent, [
    screenRouterProviders,
    HTTP_PROVIDERS
]).catch(err => console.error(err));
