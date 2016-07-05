/**
 * Created by Vlad on 7/5/2016.
 */
import {Component, Input} from '@angular/core';
import {HTTP_PROVIDERS, Http} from "@angular/http";

@Component({
    selector: '[myTr]',
    template: `<td (click)="onClick(val)"   *ngFor="let val of row"  >{{val}}</td>`
})
export class MyTrComponent {
    @Input('myTr') row;
    onClick(col):void{
        console.log(this);
    }

    ngOnInit(){
        console.log(this);
    }
}



@Component({
    selector: 'div',
    template: `{{title}}
    <table>
    <tr *ngFor="let line of data" [myTr]="line"></tr>
    </table>`,
    providers: [HTTP_PROVIDERS],
    directives: [MyTrComponent]
})
export class AppComponent2 {
    title = "Angular 2 - tr attribute selector";
    data //= [ [1,2,3], [11, 12, 13] ];
    constructor(private http:Http) {
        http.get("http://front-desk.ca/tableblue/agents/getagents.php")
            .subscribe((data:any)=> {
                var ar:any[]=[];
                data.json().list.forEach(function(item){
                    var row:string[] =[]
                    for(var str in item) row.push(item[str]);
                    ar.push(row);
                })


                console.log(data);

            this.data = ar;

            });

    }

    onClick(col):void{
        console.log(col);
    }
}