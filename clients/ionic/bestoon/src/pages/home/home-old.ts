import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeneralstatProvider } from '../../providers/generalstat/generalstat';
import { Injectable,  ErrorHandler } from '@angular/core';

import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    statresp:any;
    url:any;
    public name;
    public token:any;
    //token='Fhj4VUdQz3BUnwJ92NUsLzcQWaDM1T0SCjQVAUmWKVXTyBlL';
    weather:any;

    constructor(private generalStat:GeneralstatProvider,
        private http: Http,
        public handleError: ErrorHandler,
        public storage: Storage) {

            //  constructor(public navCtrl: NavController, private generalStat:GeneralstatProvider) {
            //  constructor(public navCtrl: NavController) {
            //$scope.name='ahmad'
            //this.getMessages();
            //var data='token=Fhj4VUdQz3BUnwJ92NUsLzcQWaDM1T0SCjQVAUmWKVXTyBlL'
            //this.url='http://ahmadubuntu.pythonanywhere.com/q/generalstat/';

            //this.url='http://localhost:8100/q/generalstat/';
            //this.generalStat.login().subscribe(statresp => {this.statresp})
            //this.name = 'ahmad';

            //this.generalStat.login();
            //this.gst()
            //this.loadStat();

            this.storage.get('token').then(res => {this.token=res})
        }
//End of constructor




    ionViewWillEnter(){
        this.storage.get('token').then(res => {this.token=res});
        console.log(this.token)
        this.generalStat.getStat().subscribe(weather => {
            //console.log(weather);
            this.weather = weather;
        });
        console.log(this.token)
    }











/*
gst() {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    // TODO: Encode the values using encodeURIComponent().
    let body = 'token=' + this.token ; //+ '&from=' + from;
    return this.http.post(this.url,
        body,
        //{token: this.token,}
        {headers: headers})
        //.toPromise()
        //.then(statresp => { return statresp.json() }, this.handleError);
        //.map(statresp => statresp.json());
        //.catch(error => console.log(error))
        .subscribe(() => console.log("request done with success"));
        //.subscribe((data) => {this.statresp = data;});
        //.then(statresp => { console.log(statresp.json().expense.amount__sum) });
        //.then(statresp => { console.log(statresp.json().expense.amount__sum) }, this.handleError);
        //.then( statresp => { this.statresp = statresp.json() }, this.handleError);
}
*/



/*
gst() {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let body = 'token=' + this.token ;
    return this.http.post(this.url, body, {headers: headers})
        //.subscribe(() => console.log("request done with success"));
        .toPromise()
        .then(statresp => { return statresp.json() } );
}
*/


/*
loadStat(){
    this.generalStat.login()
    .then(data => {
      this.statresp = data;
  })}
*/

}
