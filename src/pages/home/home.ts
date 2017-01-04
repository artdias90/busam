import { Component } from '@angular/core';
import {Platform, NavController, AlertController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from "../../services/auth/auth";
import {GlobalVars} from "../../services/globals/globals";
import {BusamService} from "../../services/busam/busam";
import {LinhasPage} from "../linhas/linhas";
import {OneSignal} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService, GlobalVars, BusamService]
})

export class HomePage {
	loggedInUserInfo: any;
	linhas: any;
	item: any;

  constructor(
  	GlobalVars: GlobalVars,
  	platform: Platform,
  	private navCtrl: NavController,
  	private http: Http,
  	private authService: AuthService,
  	private alertCtrl: AlertController,
  	private busamService: BusamService
  ){

    OneSignal.startInit('879d5998-41e7-4022-a4c6-e7185757ba91', '787549999647');
    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
    OneSignal.endInit();

    OneSignal.getIds().then(response => {
      this.authService.setNotificationsId(response.userId).subscribe(response2 => {})
    });


  	this.linhas = this.busamService.getLinhas().subscribe(
    response => {
    	this.item = response;
    },
    error => {
      console.log("erro", "Ocorreu um erro. Tente novamente.");
    });
  }

  viewItem(item){
    this.navCtrl.push(LinhasPage, {
      item: item
    });
  }

}
