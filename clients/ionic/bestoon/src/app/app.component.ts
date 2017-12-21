import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { GeneralstatProvider } from '../providers/generalstat/generalstat';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;
  token:any;
  rootPage:any;

    constructor(platform: Platform, statusBar: StatusBar, public generalStat:GeneralstatProvider,
                splashScreen: SplashScreen, public storage: Storage)
                {
                    platform.ready().then(() => {
                        // Okay, so the platform is ready and our plugins are available.
                        // Here you can do any higher level native things you might need.
                        statusBar.styleDefault();
                        splashScreen.hide();
                        this.storage.get('token').then(res => {
                            //console.log('tok='+res);
                            this.token = res;
                            this.generalStat.token = res;
                            if (this.token || this.generalStat.token){
                                this.rootPage = TabsPage;
                            } else {
                                this.rootPage = SettingsPage;
                            }
                        })
                        //console.log('token in app:')
                        //console.log(this.token)
                        //console.log(this.generalStat.token)

                });
  }
}
