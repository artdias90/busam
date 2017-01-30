import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LinhasPage } from "../linhas/linhas";
import { StartPage } from "../start/start";

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
  currResults:any;
  aviso;
  imagem;
  link;
  imagem_footer;
  link_footer;
  private admobId: any;
  showLoading = true;
  cidade;
  backcity;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private busamService:BusamService) {

    this.cidade = this.busamService.verificaCidade();
    if(this.cidade == 1){
      this.backcity = "../www/assets/img/valinhos_2.jpg";
    }else if(this.cidade == 3){
      this.backcity = "../www/assets/img/vinhedo.jpg";
    }
    console.log(this.backcity);
    this.aviso = this.busamService.getObs(0).subscribe(
      response => {
        this.aviso = response[0].txtObservacao;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    this.imagem = this.busamService.getObs(9999).subscribe(
      response => {
        this.imagem = response[0].txtObservacao;
        this.link =  response[0].corObservacao;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    this.imagem_footer = this.busamService.getObs(9999).subscribe(
      response => {
        this.imagem_footer = response[0].txtObservacao;
        this.link_footer = response[0].corObservacao;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    this.linhas = this.busamService.getLinhas(this.cidade).subscribe(
      response => {
        this.item = response;
        this.showLoading = false;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });




    // admob setup
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

  }



  //BUSCA
  getLinhas(ev: any) {
    this.currResults = [];
    let val = ev.target.value;
    if(!val || val.length <= 2) {
      this.linhas = this.busamService.getLinhas(this.cidade).subscribe(
        response => {
          this.item = response;
          this.showLoading = false;
        },
        error => {
          console.log("erro", "Ocorreu um erro. Tente novamente.");
        });
    } else if (val && val.trim() != '' && val.length > 2) {
      this.busamService.getLinhas(this.cidade).subscribe(response => {
        this.item = response.filter((item) => {
          return (item.nomeLinha.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }, error => {})
    }
  }

  ionViewDidLoad() {
    console.log("admob");
    this.createBanner();
    this.showBanner("top");
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



  viewItem(item) {
    this.navCtrl.push(LinhasPage, {
      item: item
    });
  }

  backStart(){
    this.busamService.resetaCidade();
    this.navCtrl.push(StartPage, {});
  }

}
