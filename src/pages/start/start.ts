import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { HomePage } from "../home/home";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
declare var AdMob: any;

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
  providers: [AuthService, GlobalVars, BusamService]
})

export class StartPage {
  linhas:any;
  item:any;
  showLoading = true;
  cidade;
  linha;
  icone;
  promocao;
  storage;
  private options = { name: "data16.db", location: 'default', createFromLocation: 1 };
  private queryNames = "SELECT * FROM cidade";
  public names: String[] = [];

  private admobId: any;
      public people: Array<Object>;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private busamService:BusamService,
              private sqlite: SQLite
              ) {
   
    this.platform.ready().then(() => {
  

    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.names.push(rows.item(i).nomeCidade);
        console.log("Number of names on database = " + this.names.length);
      })
    });






    });
    this.platform = platform;
    if (/(android)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-5898281503537290/4820015210',
        interstitial: 'ca-app-pub-5898281503537290/4820015210'
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-5898281503537290~1866548811',
        interstitial: 'ca-app-pub-5898281503537290~1866548811'
      };
    }

    this.icone = GlobalVars.platform + GlobalVars.icon;
    this.cidade = this.busamService.verificaCidade();
    if(this.cidade){
    } else {
      this.navCtrl.push(HomePage, {});
    }
  }



  ionViewDidLoad() {
    // if (/(android)/i.test(navigator.userAgent)) {
    //   this.createBanner();
    //   this.showBanner("top");
    // }
  }

  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) {
        console.log("criando banner");
        console.log(this.admobId.banner);
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
        console.log("banner criado com sucesso");
      }
    });
  }

  selecionacidade(select){
    localStorage.setItem("idCidadeBusam", select);
    this.cidade = localStorage.getItem("idCidadeBusam");
    this.navCtrl.push(HomePage, {});
  }
}
