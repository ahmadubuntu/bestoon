import { NgModule, ErrorHandler } from '@angular/core';
//import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
//import { HttpClient, HttpHeaders, RequestOptions } from '@angular/common/http'
//import { Http, Response } from '@angular/http';

import { ContactPage } from '../pages/contact/contact';
import { IncomePage } from '../pages/income/income';
import { ExpensePage } from '../pages/expense/expense';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GeneralstatProvider } from '../providers/generalstat/generalstat';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    IncomePage,
    ExpensePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //Http,
    //Response,
//    Injectable,
//    ErrorHandler,
//    HttpClient,
//    HttpHeaders,
//    RequestOptions,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    IncomePage,
    ExpensePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeneralstatProvider
  ]
})
export class AppModule {}
