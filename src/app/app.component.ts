// $ ionic plugin add --save onesignal-cordova-plugin
// $ npm install --save @ionic-native/onesignal

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StartPage } from '../pages/start/start';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = StartPage;
  
  constructor(platform: Platform, private oneSignal: OneSignal) {
    platform.ready().then(() => {
			this.oneSignal.startInit('36133896-e5f4-45a8-8661-3e31bd6806f4', '863552885140');
			this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
			this.oneSignal.handleNotificationReceived().subscribe(() => {});
			this.oneSignal.handleNotificationOpened().subscribe(() => {});
			this.oneSignal.endInit();
    });
  }
}
