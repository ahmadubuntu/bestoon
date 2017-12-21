import { Component, ViewChild } from '@angular/core';
import { NavController, App, ViewController, IonicPage } from 'ionic-angular';
import { GeneralstatProvider } from '../../providers/generalstat/generalstat';
import { Injectable,  ErrorHandler } from '@angular/core';

import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SettingsPage }from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    statresp:any;
    url:any;
    //public name;
    weather:any;
    rootPage: any = HomePage;
    token:any =false;
    loggedin:any = false;

    constructor( public navCtrl: NavController,
        public viewCtrl: ViewController,
        public appCtrl: App,
        public generalStat:GeneralstatProvider,
        private http: Http,
        public handleError: ErrorHandler,
        public storage: Storage) {
            //this.token = this.generalStat.token
            //this.storage.ready().then(() => this.storage.get('token').then(res => {this.generalStat.token=res}))

            this.storage.get('token').then(res => {this.token=res})
            this.loggedin = this.generalStat.loggedin
            /*
            if (this.token) {
                this.loggedin=true
            }*/
            // Wait for the components in MyApp's template to be initialized
// In this case, we are waiting for the Nav with reference variable of "#myNav"
/*
ngOnInit() {
   // Let's navigate from TabsPage to Page1
   this.navCtrl.push(SettingsPage);
}
*/

/*
    this.navCtrl.setRoot(HomePage)
              .then((permission) => {
                  if (!this.token) {
                      this.navCtrl.setRoot('SettingsPage');
                  }
              });
*/







        }
//End of constructor




/*
    ionViewCanEnter() {
        console.log('I am checking home page entrance')
        console.log(this.generalStat.loggedin)

        console.log('I am cheking token in storage')
        this.storage.get('token').then(res => { this.token=res});
        console.log(this.token)
        if ( this.generalStat.loggedin || this.token )
        { return true} else {return false}

    }
*/


    ionViewDidEnter(){
        //this.storage.ready().then(() => this.storage.get('token').then(res => {this.generalStat.token=res}))
        this.storage.get('token').then(res => {this.token=res;
            this.generalStat.getStat().subscribe(weather => {
                this.weather = weather;
            });
        });
        if ( this.generalStat.token){this.generalStat.loggedin=true;}
        //console.log(this.generalStat.token)
        //if (!this.generalStat.token) { this.rootPage = SettingsPage; }
        /*
        this.generalStat.getStat().subscribe(weather => {
            this.weather = weather;
        });*/
    }



/*
    pushPage() {
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().push(SettingsPage);
    }
*/

}
