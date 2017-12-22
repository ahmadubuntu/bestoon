import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import { Injectable,  ErrorHandler } from '@angular/core';
import { GeneralstatProvider } from '../../providers/generalstat/generalstat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';
//import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
    credentialsForm: FormGroup;
    username:string;
    password:string;
    private submitlogin:any;
    private submitlogout:any;
    token:any = null;
    //public token:any;
    private loggedin:any;
    myFormGroup:any;
    sss:any;
    nnn:any;
    private savedata:any;
    private showdata:any;
    private news:any;
    private newsst:any;
    //private newsparsed:any=JSON.parse(this.news);
    private newsparsed:any=this.news;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private generalStat:GeneralstatProvider,
                private formBuilder: FormBuilder,
                private http: Http,
                public handleError: ErrorHandler,
                public storage: Storage,
                public alertCtrl: AlertController
            ) {

          //this.loggedin = false;
          this.token = this.storage.get('token');
          if (this.generalStat.token || this.token ){
              this.generalStat.loggedin = true; this.loggedin = true;
          }



          this.submitlogin = function(){
              //console.log(this.username);
              let data:any;
              this.generalStat.getToken(this.username,this.password,this.loggedin);
              //console.log('submit login is:');
              //console.log(this.submitlogin)
              if (this.submitlogin){ this.loggedin = true; console.log('seccessfull submit') ;
                    let alert = this.alertCtrl.create({message:'OK'}); alert.present(); this.navCtrl.push(TabsPage); }
          }


          this.submitlogout = function(){
                console.log('logout');
                this.storage.remove('token');
                this.generalStat.loggedin=false;
                this.loggedin=false;
                this.generalStat.token = null;
                this.password=null;
                this.username=null;
                this.storage.clear().then(() => {
                                                console.log('all keys cleared');
                                            });
                //this.generalState.backToLogin();
          }

          this.savedata= function(){
              this.storage.set('name',this.nnn)
          }

          this.showdata= function(){
              this.storage.get('name').then(res => {this.sss=res})
              //this.storage.get('token').then(res => {this.token=res})
              this.token = this.generalStat.token
          }


  }


/*
    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }
*/

/*
    ionViewWillEnter(){
        //this.loggedin = false;
        this.storage.get('token').then(res => {this.token=res})
        if (this.generalStat.token){
            this.loggedin = true;
            console.log('I found a token in storage:')
            console.log(this.generalStat.token)
        }
    }
*/


    ionViewDidEnter(){
        this.storage.get('token').then(res => {this.token=res;
            this.generalStat.getNews().subscribe(news => {
                this.news = news;
                //console.log(JSON.parse(this.news));
                this.news=JSON.parse(this.news)
            });
        });
    }


}
