import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { HomePage } from "../home/home";
import { ContactPage } from "../contact/contact";
import { LoadingComponent } from "../../services/loading/loading";

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
  background;
  icone;
  promocao;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private loadingComponent:LoadingComponent,
              private busamService:BusamService) {

    this.background = GlobalVars.platform + GlobalVars.background;
    this.icone = GlobalVars.platform + GlobalVars.icon;
    this.cidade = this.busamService.verificaCidade();
    this.promocao = this.busamService.verificaPromocao();
    this.loadingComponent.show();
    if(!this.promocao){
      this.loadingComponent.hide();
      this.navCtrl.push(ContactPage, {});    
    } else {
      if(this.cidade){
        this.loadingComponent.hide();
        this.navCtrl.push(HomePage, {});    
      }  
    }
    
    this.linhas = this.busamService.getCidades().subscribe(
    response => {
      this.item = response;
      this.showLoading = false;
      this.loadingComponent.hide();
    },
    error => {
      console.log("erro", "Ocorreu um erro. Tente novamente.");
    });
  }

  ionViewDidLoad() {}

  selecionacidade(event, select){
    localStorage.setItem("idCidadeBusam", select);
    this.cidade = localStorage.getItem("idCidadeBusam");
    this.navCtrl.push(HomePage, {});
  }
}
