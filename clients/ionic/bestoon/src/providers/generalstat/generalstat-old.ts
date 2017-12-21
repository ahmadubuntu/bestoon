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

/*
  Generated class for the GeneralstatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralstatProvider {
    token:any;
    //token='Fhj4VUdQz3BUnwJ92NUsLzcQWaDM1T0SCjQVAUmWKVXTyBlL';
    //url = "http://ahmadubuntu.pythonanywhere.com/q/generalstat/";
    url:any;
    baseurl='http://localhost:8100/';
    statresp:any;
    stat:any;
    data:any;
    public respon:any;
    message:any;
//  constructor(private http: HttpClient) {
  constructor(private http: Http,
       public handleError: ErrorHandler,
       public storage: Storage) {


//    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

    console.log('Hello GeneralstatProvider Provider');
    this.token = this.storage.get('token');


/*
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    });
    let options = new RequestOptions({
        headers: headers
    });
*/
 }
// end of constructor


//token, url

    getStat() {
      let headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
//      headers.append('Access-Control-Allow-Origin', '*')
//      headers.append('Access-Control-Allow-Methods', 'GET,POST')
//      headers.append('Access-Control-Allow-Headers', 'Authorization, Content-Type')


//      let headers = new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded'
//      });
//      let options = new RequestOptions({
//         headers: headers
//      });
        // TODO: Encode the values using encodeURIComponent().
        this.token = this.storage.get('token').then(res => res);
        let body = 'token=' + this.token ; //+ '&from=' + from;

console.log('this.token in general stat is')
this.storage.get('token').then( res => {console.log(res); this.token = res});
console.log(this.storage.get('token'))
//this was ok
/*
      return this.http.post(this.url,
          body,
        //{token: this.token,}
        {headers: headers})
        .toPromise()
        //.then(statresp => { return statresp.json() }, this.handleError);
        //.map(res => res.json());
        //.subscribe(() => console.log("request done with success"));
        .then(statresp => { console.log(statresp.json()) }, this.handleError);
    }
*/

/*
    return this.http.post(this.url,
        body,
      //{token: this.token,}
      {headers: headers})
      .toPromise()
      //.then(statresp => { return statresp.json() }, this.handleError);
      //.map(statresp => statresp.json().expense.amount__sum);
      //.catch(error => console.log(error))
      //.subscribe(() => console.log("request done with success"));
      //.subscribe((data) => {this.statresp = data;});
      .then(statresp => console.log(statresp.json().expense.amount__sum));
      //.then(statresp => { console.log(statresp.json().expense.amount__sum) }, this.handleError);
      //.then( statresp => { this.statresp = statresp.json() }, this.handleError);
  }
*/


/*
    this.respon = this.http.post(this.url, body, {headers: headers})
        //.toPromise()
        //.then(statresp => { return statresp.json() }, this.handleError);
        //.map(res => res.json()).subscribe(data=>{console.log(data)});
        .map(res => res.json()).subscribe(data=>{
                                                this.stat = data.resaults;
                                                console.log(data.expense.amount__sum)},
                                            err => {console.log("Oops!");}
        );
*/

/*this.respon = this.http.post(this.url, body, {headers: headers})*/
return this.http.post(this.baseurl+'q/generalstat/', body, {headers: headers})
    //.toPromise()
    //.then(statresp => { return statresp.json() }, this.handleError);
    //.map(res => res.json()).subscribe(data=>{console.log(data)});
    .map(res => res.json());
    /*.subscribe(data=>{
                                            this.stat = data.resaults;
                                            console.log(data.expense.amount__sum)},
                                        err => {console.log("Oops!");}
    );*/


        //.catch(error => console.log(error))
        //.subscribe(() => console.log("request done with success"));
        //.subscribe((data) => {this.statresp = data;});
        //.then(statresp => console.log(statresp.json().expense.amount__sum));
        //.then(statresp => { console.log(statresp.json().expense.amount__sum) }, this.handleError);
        //.then( statresp => { this.statresp = statresp.json() }, this.handleError);
    //return respon


    //console.log('man ghable responsam')
    //console.log(respon)
    //console.log('man bade responsam')
    //console.log(this.stat)
    //console.log('bade stat')
    //console.log(respon)

}








    setExpense(AMOUNT,TEXT) {
            //let error:any;
            this.token = this.storage.get('token');
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
        //let error:any;
        this.token = this.storage.get('token');
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
                                        LOGGEDIN=true;
                                        return true}
                                       })
            //.map(res => res.json())
        .catch(error => {console.log(error); this.message='either username or password are not correct'})
        //.catch(console.log('Error in submitting income'))

}



}
