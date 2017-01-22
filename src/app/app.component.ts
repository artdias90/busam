import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Deeplinks, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import { OneSignal} from 'ionic-native';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage = StartPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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

      Deeplinks.routeWithNavController(this.nav, {
        '/start': StartPage
      });
    });
  }
}
