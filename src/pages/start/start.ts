import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { HomePage } from "../home/home";
import { LoadingComponent } from "../../services/loading/loading";
import { SQLite } from 'ionic-native';
declare var AdMob: any;

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
  providers: [AuthService, GlobalVars, BusamService, LoadingComponent]
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
      public database: SQLite;

  private admobId: any;
      public people: Array<Object>;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private loadingComponent:LoadingComponent,
              private busamService:BusamService
              ) {
   
    this.platform.ready().then(() => {
  

this.database = new SQLite();
this.database.openDatabase({name: "data.db", location: "default", createFromLocation: 1}).then(() => {
    

 this.database.executeSql("INSERT INTO people (firstname, lastname) VALUES ('Nic', 'Raboy')", []).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });



this.database.executeSql("SELECT * FROM people", []).then((data) => {
            this.people = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.people.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });


}, (error) => {
    console.log("ERROR: ", error);
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
    this.loadingComponent.show();

    if(this.cidade){
      this.loadingComponent.hide();
      this.navCtrl.push(HomePage, {});    
    } else {
      this.loadingComponent.hide();
    }
  }



  ionViewDidLoad() {
    if (/(android)/i.test(navigator.userAgent)) {
      this.createBanner();
      this.showBanner("top");
    }
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
