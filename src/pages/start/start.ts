import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LinhasPage } from "../linhas/linhas";
import { HomePage } from "../home/home";
/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
  providers: [AuthService, GlobalVars, BusamService]
})
export class StartPage {
  linhas:any;
  item:any;
  showLoading = true;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private busamService:BusamService) {


    this.linhas = this.busamService.getCidades().subscribe(
    response => {
      this.item = response;
      console.log(this.item);
      this.showLoading = false;
    },
    error => {
      console.log("erro", "Ocorreu um erro. Tente novamente.");
    });
  }

  ionViewDidLoad() {
    console.log('Hello StartPage Page');
    this.navCtrl.push(HomePage, {});
  }


}
