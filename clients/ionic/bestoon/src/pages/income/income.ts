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
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-income',
  templateUrl: 'income.html'
})
export class IncomePage {
    credentialsForm: FormGroup;
    incomemoney:number;
    incometitle:string;
    private submit:any
    private token:any;
    priviousIncomes:any;
    private edit:any;
    private delete:any;


  constructor(public navCtrl: NavController,
      private generalStat:GeneralstatProvider,
      private formBuilder: FormBuilder,
      private http: Http,
      public handleError: ErrorHandler,
      public toastCtrl: ToastController,
      public storage: Storage
      ) {


      this.submit = function(){
            this.generalStat.setIncome(this.incomemoney,this.incometitle)
                .then(res => {this.incomemoney= null;
                        this.incometitle=null;
                })
            if (this.submit){this.presentToast();this.incomemoney=null;this.incometitle=''; this.checklastIncomes()}
      }



              this.delete = function(expense){
                  console.log('i am in delete of item'+expense.pk)
              }


              this.edit = function(expense){
                  console.log('i am in edit of item'+expense.pk)

              }



  }
//end of constructor





ionViewWillEnter(){
    this.checklastIncomes()
}



checklastIncomes = function(){
    this.storage.get('token').then(res => {this.token=res;
        this.generalStat.getLastIncomes().subscribe(data => {
            this.priviousIncomes = data;
            this.priviousIncomes = JSON.parse(this.priviousIncomes)
            console.log(this.priviousIncomes);
        });
    });
}


presentToast() {
  let toast = this.toastCtrl.create({
    message: 'درآمد جدید به درستی اضافه شد',
    duration: 3000,
    position: 'top'
  });
  toast.present();
}



}
