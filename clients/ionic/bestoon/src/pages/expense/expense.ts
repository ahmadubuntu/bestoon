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
  selector: 'page-expense',
  templateUrl: 'expense.html'
})
export class ExpensePage {
      credentialsForm: FormGroup;
      expnmoney:number;
      expntitle:string;
      priviousExpnses:any;
      private submit:any;
      private token:any;
      private edit:any;
      private delete:any;

  constructor( public navCtrl: NavController,
                private generalStat:GeneralstatProvider,
                private formBuilder: FormBuilder,
                private http: Http,
                public handleError: ErrorHandler,
                public toastCtrl: ToastController,
                public storage: Storage
            ) {
        /*
        this.credentialsForm = this.formBuilder.group({
            email: [''],
            password: ['']
        });
        */

        this.submit = function(){
            console.log(this.expntitle);
            this.generalStat.setExpense(this.expnmoney,this.expntitle)
            if (this.submit){this.presentToast();this.expnmoney=null;this.expntitle=''; this.checklastExpenses()}

            /*
            .subscribe(sts => { this.expnmoney=0; this.expntitle=''; console.log(sts);
                                    // show a TOAST
                                    //this.weather = weather;
                                }
            )*/
            //.map(sts => {console.log('success')})
            //.toPromise()
            //.then(sss => this.message='اطلاعات ارسال شد')
            //.catch(jjj => this.message='اطلاعات به درستی ثبت نشد. لطفا مجددا تلاش کنید.')
        }



        /*
        this.removeItem= function (item){

          for(i = 0; i < this.items.length; i++) {

                if(this.items[i] == item){
                    this.items.splice(i, 1);
                }
            }
        }
        */


        this.delete = function(expense){
            console.log('i am in delete of item'+expense.pk)
        }


        this.edit = function(expense){
            console.log('i am in edit of item'+expense.pk)

        }




  }
  //end of constructor





    /*
    ionViewWillEnter(){
        this.generalStat.setExpense(this.expnmoney,this.expntitle).subscribe(sts => {
            this.expnmoney=0;
            this.expntitle='';
            console.log(sts);
            // show a TOAST
            //this.weather = weather;
        })
    }
    */



    ionViewWillEnter(){
        this.checklastExpenses()
    }


    checklastExpenses = function(){
        this.storage.get('token').then(res => {this.token=res;
            this.generalStat.getLastExpenses().subscribe(data => {
                this.priviousExpnses = data;
                this.priviousExpnses = JSON.parse(this.priviousExpnses)
                console.log(this.priviousExpnses);
            });
        });
    }


    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'خرج جدید به درستی اضافه شد.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }





}
