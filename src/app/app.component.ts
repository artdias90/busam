import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar, Deeplinks, Splashscreen, LocalNotifications } from 'ionic-native';
import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { HorariosFavoritosPage } from '../pages/horarios-favoritos/horarios-favoritos';
import { ContactPage } from '../pages/contact/contact';
import { TipsPage } from '../pages/tips/tips';
import { LembreteService } from '../services/lembrete/lembrete.service';
import { OneSignal } from 'ionic-native';

@Component({
  templateUrl: 'app.html',
  providers: [LembreteService]
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage: any = StartPage;
  menuTitle:string = "BusAM";
  pages: Array<{title: string, component: any}>;

  constructor(platform:Platform, lembreteService:LembreteService, menu: MenuController) {
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

      lembreteService.updateLembretes();

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Cidades', component: StartPage },
        { title: 'Lembretes', component: HorariosFavoritosPage},
        { title: 'Contato', component: ContactPage}
      ];

    });
  }


  openPage(page) {
    if(page.title === 'Home' &&  Math.random() > 0.05) {
      this.nav.setRoot(TipsPage);
    } else {
      this.nav.setRoot(page.component);
    }
  }

}
