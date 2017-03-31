import {Injectable} from '@angular/core';

@Injectable()

export class GlobalVars {
  host: any;
  hostUser: any;
  appId: any;
  appName: any;
  key_id: any;
  key_usuario: any;
  key_senha: any;
  platform: any;
  icon: any;

  constructor() {
    this.host = "http://api.codeam.com.br/busam/";
    this.hostUser = "http://api.codeam.com.br/users/";
    this.appId = 1;
    this.appName = "Busam";
    this.key_id = "busam_id";
    this.key_usuario = "busam_user";
    this.key_senha = "busam_password";
    this.platform = "../www";
    // this.platform = "";
    this.icon = "/assets/img/icon.png";
  }

}