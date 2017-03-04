import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Deeplinks, Splashscreen } from 'ionic-native';
import { StartPage } from '../pages/start/start';
//import { HomePage } from '../pages/home/home';
import { OneSignal} from 'ionic-native';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage = StartPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {


      StatusBar.styleDefault();
      Splashscreen.hide();

      if (/(android)/i.test(navigator.userAgent)) {
        OneSignal.startInit('36133896-e5f4-45a8-8661-3e31bd6806f4', '863552885140');
        OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
        OneSignal.setSubscription(true);
        OneSignal.handleNotificationReceived().subscribe(() => {
// do something when the notification is received.
        });
        OneSignal.handleNotificationOpened().subscribe(() => {
// do something when the notification is opened.
        });
        OneSignal.endInit();
      }
      Deeplinks.routeWithNavController(this.nav, {
        '/start': StartPage
      });
    });
  }
}
