import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LinhasPage } from "../linhas/linhas";

declare var AdMob: any;


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
        banner: 'ca-app-pub-9679740505479624/9819218390',
        interstitial: 'ca-app-pub-9679740505479624/9819218390'
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-9679740505479624/9819218390',
        interstitial: 'ca-app-pub-9679740505479624/9819218390'
      };
    }

  }

  ionViewWillEnter() {
    this.createBanner();
    this.showBanner("top");
  }

  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.createBanner({
          adId: this.admobId.banner,
          autoShow: true
        });
      }
    });
  }

  showBanner(position) {
    this.platform.ready().then(() => {
      if (AdMob) {
        var positionMap = {
          "bottom": AdMob.AD_POSITION.BOTTOM_CENTER,
          "top": AdMob.AD_POSITION.TOP_CENTER
        };
        AdMob.showBanner(positionMap[position.toLowerCase()]);
      }
    });
  }



  viewItem(item) {
    this.navCtrl.push(LinhasPage, {
      item: item
    });
  }

}
