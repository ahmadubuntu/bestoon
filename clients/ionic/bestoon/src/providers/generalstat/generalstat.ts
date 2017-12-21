import { HttpClient } from '@angular/common/http';
import { Injectable,  ErrorHandler } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/Rx';
//import {CommonModule} from '@angular/common';
//import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SettingsPage }from '../../pages/settings/settings';


/*
  Generated class for the GeneralstatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralstatProvider {
    public token:any=null;
    url:any;
    baseurl='http://localhost:8100/';
    statresp:any;
    stat:any;
    data:any;
    public respon:any;
    private message:any;
    public loggedin:any;

    constructor(private http: Http,
        public handleError: ErrorHandler,
        public storage: Storage,
    ) {

        console.log('Hello GeneralstatProvider Provider');
        this.storage.get('token').then(res => {this.token=res});
        this.loggedin=false;
        if (this.token){
            this.loggedin = true;
        }
/*        else{
            this.loggedin = false
        }
*/

 }
// end of constructor






    getStat() {
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        this.storage.get('token').then(res => {this.token=res});
        let body = 'token=' + this.token ;

        return this.http.post(this.baseurl+'q/generalstat/', body, {headers: headers})
                .map(res => res.json());
    }


    setExpense(AMOUNT,TEXT) {
        //this.storage.get('token').then(res => {this.token=res});
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let body = 'token=' + this.token + '&amount=' + AMOUNT + '&text=' + TEXT;

        return this.http.post(this.baseurl+'submit/expense/', body, {headers: headers})
        .toPromise()
        .then(res => { return res.json() })
            //.map(res => res.json())
        .catch(error => console.log(error))
    }


    setIncome(AMOUNT,TEXT) {
        //this.storage.get('token').then(res => {this.token=res});
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let body = 'token=' + this.token + '&amount=' + AMOUNT + '&text=' + TEXT;

        return this.http.post(this.baseurl+'submit/income/', body, {headers: headers})
        .toPromise()
        .then(res => { return res.json() })
            //.map(res => res.json())
        .catch(error => console.log(error))
        //.catch(console.log('Error in submitting income'))
    }


    getToken(USERNAME,PASSWORD,LOGGEDIN) {
        //let error:any;
        //this.token = this.storage.get('token');
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let body = 'username=' + USERNAME + '&password=' + PASSWORD;

        return this.http.post(this.baseurl+'accounts/login/', body, {headers: headers})
        .toPromise()
        //.then(res => { return res.json() })
        .then(res => {
            if (res.json().status='ok'){
                                        console.log(res.json().token);
                                        this.storage.set('token',res.json().token);
                                        this.token=res.json().token;
                                        this.loggedin = true;
                                        LOGGEDIN=true;
                                        //DATA = {'token':res.json().token, 'status':true };
                                        //return true}
                                        return true}
                                       })
            //.map(res => res.json())
        .catch(error => {console.log(error); this.message='either username or password are not correct'})
        //.catch(console.log('Error in submitting income'))
    }



}
