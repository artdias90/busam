import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Http } from '@angular/http';
import {AuthService} from "../../services/auth/auth";
import {GlobalVars} from "../../services/globals/globals";
import {AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {PasswordResetPage} from '../password-reset/password-reset';
import {RegisterPage} from '../register/register';

@Component({
  templateUrl: 'login.html',
  providers: [AuthService, GlobalVars]
})

export class LoginPage {
  username: string;
  password: string;
  usuario: string;
  senha: string;
  items: any;
  id: string;
  key_id: any;
  key_usuario: any;
  key_senha: any;

  constructor(
    GlobalVars: GlobalVars,
    private navController: NavController,
    private http: Http,
    private authService: AuthService,
    private alertCtrl: AlertController
  ){
    this.key_id = GlobalVars.key_id;
    this.key_usuario = GlobalVars.key_usuario;
    this.key_senha = GlobalVars.key_senha;
  }

  navigate(slug) {
    switch (slug) {
      case 'password-reset':
        this.navController.push(PasswordResetPage);
        break;
      case 'register':
        this.navController.push(RegisterPage);
        break;
    }
  }
  login() {
    this.authService.login(this.username, this.password).subscribe(
      login => {
        if (login.flag && login.flag == 1) {
          let alert = this.alertCtrl.create({
            title: 'Verifique seu Email',
            subTitle: 'Ative seu cadastro clicando no link enviado por email!',
            buttons: ['OK']
          });
          alert.present();
        } else if (login.flag && login.flag == 3) {
          let alert = this.alertCtrl.create({
            title: 'Login Incorreto',
            subTitle: 'Verifique seus dados e tente novamente.',
            buttons: ['OK']
          });
          alert.present();
        } else {
          window.localStorage.setItem(this.key_usuario, login[0].emailUser);
          window.localStorage.setItem(this.key_senha, login[0].senhaUser);
          window.localStorage.setItem(this.key_id, login[0].idUser);
          // OneSignal.startInit('405cb0c5-6bea-4cc1-8aa7-7b6b63037f44', '787549999647');
          // OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
          // OneSignal.endInit();
          // if (!login[0].idNotifications) {
          //   // registra PUSH NOTIFICATIONS
          //   OneSignal.getIds().then(response => {
          //     this.authService.setNotificationsId(login[0].id, response.userId).subscribe(response2 => {
          //       //this.navController.push(TabsPage);
          //     });
          //   });
          // } else {
          //   OneSignal.endInit();
          //   //this.navController.push(TabsPage);
          // }
          this.navController.push(TabsPage);
        }

      },
      error => {
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Ocorreu um erro ao realizar login. Favor tente novamente.',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

  goHome() {
    this.navController.push(TabsPage);
  }


}
