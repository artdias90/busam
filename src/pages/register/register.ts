import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AuthService} from "../../services/auth/auth";
import { AlertController } from 'ionic-angular';
import {GlobalVars} from "../../services/globals/globals";

@Component({
  templateUrl: 'register.html',
  providers: [AuthService, GlobalVars]
})

export class RegisterPage {
  username:string;
  realName: string;
  password:string;
  passwordConfirm: string;
  constructor(GlobalVars: GlobalVars, private navController: NavController, private authService: AuthService, private alertCtrl: AlertController) {
  }


  register() {
    this.authService.register(this.username, this.realName, this.password).subscribe(
      response => {
        let alert = this.alertCtrl.create({
          title: 'Verifique seu Email',
          subTitle: 'Cadastro realizado com sucesso!',
          buttons: ['OK']
        });
        alert.present();
        this.navController.push(LoginPage);
      },
      error => console.log("ERROR",error));
  }

}
