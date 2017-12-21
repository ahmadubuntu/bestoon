import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import { Injectable,  ErrorHandler } from '@angular/core';
import { GeneralstatProvider } from '../../providers/generalstat/generalstat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-income',
  templateUrl: 'income.html'
})
export class IncomePage {
    credentialsForm: FormGroup;
    incomemoney:number;
    incometitle:string;
    private submit:any

  constructor(public navCtrl: NavController,
      private generalStat:GeneralstatProvider,
      private formBuilder: FormBuilder,
      private http: Http,
      public handleError: ErrorHandler,
      public toastCtrl: ToastController
      ) {


      this.submit = function(){
            //console.log(this.incometitle);
            this.generalStat.setIncome(this.incomemoney,this.incometitle)
                .then(res => {this.incomemoney= null;
                        this.incometitle=null;
                })
            if (this.submit){this.presentToast();this.incomemoney=null;this.incometitle=''}
          /*
          .subscribe(sts => { this.expnmoney=0; this.expntitle=''; console.log(sts);
                                  // show a TOAST
                                  //this.weather = weather;
                              }
          )*/
          //.map(sts => {console.log('success')})
          //.toPromise()
          //.then(sss => this.message='اطلاعات ارسال شد')
          //.cactch(jjj => this.message='اطلاعات به درستی ثبت نشد. لطفا مجددا تلاش کنید.')
      }


  }
//end of constructor




presentToast() {
  let toast = this.toastCtrl.create({
    message: 'درآمد به درستی اضافه شد',
    duration: 3000,
    position: 'top'
  });
  toast.present();
}



}
