import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AuthService} from "../../services/auth/auth";
import { AlertController } from 'ionic-angular';
import {GlobalVars} from "../../services/globals/globals";

@Component({
  templateUrl: 'password-reset.html',
  providers: [AuthService, GlobalVars]
})

export class PasswordResetPage {
  emailReset:string;
  constructor(GlobalVars: GlobalVars, private navController: NavController, private authService: AuthService, private alertCtrl: AlertController) {
  }


  resetPassword() {
    this.authService.resetPassword(this.emailReset).subscribe(
      response => {
        let alert = this.alertCtrl.create({
          title: 'Verifique seu Email',
          subTitle: 'Um lembrete da sua senha foi enviado para seu email!',
          buttons: ['OK']
        });
        alert.present();
        this.navController.push(LoginPage);
      },
      error => console.log("ERROR",error));
  }
}
