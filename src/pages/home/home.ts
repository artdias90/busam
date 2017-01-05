import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LinhasPage } from "../linhas/linhas";
import { OneSignal, AdMob} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService, GlobalVars, BusamService]
})

export class HomePage {
  loggedInUserInfo:any;
  linhas:any;
  item:any;
  private admobId: any;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private busamService:BusamService) {

    OneSignal.startInit('879d5998-41e7-4022-a4c6-e7185757ba91', '787549999647');
    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
    OneSignal.endInit();

    OneSignal.getIds().then(response => {
      this.authService.setNotificationsId(response.userId).subscribe(response2 => {console.log('asdas')});
    });


    this.linhas = this.busamService.getLinhas().subscribe(
      response => {
        this.item = response;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    // admob setup
    this.platform = platform;
    if (/(android)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-9679740505479624~8342485196',
        interstitial: 'ca-app-pub-9679740505479624~8342485196'
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-9679740505479624~8342485196',
        interstitial: 'ca-app-pub-9679740505479624~8342485196'
      };
    }

  }

  ionViewWillEnter() {
    this.createBanner();
    this.showBanner("bottom");
  }

  createBanner() {
    this.platform.ready().then(() => {
      AdMob.createBanner({
          adId: this.admobId.banner,
          autoShow: true
        });
    });
  }

  showBanner(position) {
    this.platform.ready().then(() => {
      var positionMap = {
          "bottom": 8,
          "top": 2
        };
        AdMob.showBanner(positionMap[position.toLowerCase()]);
    });
  }

  viewItem(item) {
    this.navCtrl.push(LinhasPage, {
      item: item
    });
  }

}
