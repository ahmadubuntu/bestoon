import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import { Injectable,  ErrorHandler } from '@angular/core';
import { GeneralstatProvider } from '../../providers/generalstat/generalstat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html'
})
export class ExpensePage {
      credentialsForm: FormGroup;
      expnmoney:number;
      expntitle:string;
      private submit:any

  constructor(public navCtrl: NavController,
                private generalStat:GeneralstatProvider,
                private formBuilder: FormBuilder,
                private http: Http,
                public handleError: ErrorHandler) {

        this.credentialsForm = this.formBuilder.group({
            email: [''],
            password: ['']
        });

        this.submit = function(){
            console.log(this.expntitle);
            this.generalStat.setExpense(this.expnmoney,this.expntitle)
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

}
