import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from "rxjs";
import {GlobalVars} from "../globals/globals";

@Injectable()
export class AuthService {

  hostUser: any;
  key_id: any;
  key_usuario: any;
  key_senha: any;
  appId: any;
  names: Array<string>;

  constructor (private http: Http, GlobalVars: GlobalVars) {
    this.http = http;
    this.hostUser = GlobalVars.hostUser;
    this.appId = GlobalVars.appId;
    this.key_id = GlobalVars.key_id;
    this.key_usuario = GlobalVars.key_usuario;
    this.key_senha = GlobalVars.key_senha;
  }

  /**
   * authenticates user.
   * @param user: username
   * @param password: password
   */
  login(user, password):any{
    return this.http.get(this.hostUser + 'login.php?login='+user+'&senha='+password)
      .map(response => { return response.json() });
  }

  /**
   *returns logged-in user.
   */
  getCurrent():any {
    if(!window.localStorage.getItem(this.key_id)){
      return null;
    } else {
      let user = {
        id: window.localStorage.getItem(this.key_id),
        username: window.localStorage.getItem(this.key_usuario),
        password: window.localStorage.getItem(this.key_senha)
      };
      return user;
    }
  }

  /**
   *returns user info
   */
  getUser(userId):any {
    return this.http.get(this.hostUser + 'list-user.php?id='+ userId)
      .map(response => { return response.json() });
  }

  /**
   *deletes an user session
   */
  logout():any {
    window.localStorage.removeItem(this.key_id);
    window.localStorage.removeItem(this.key_usuario);
    window.localStorage.removeItem(this.key_senha);
    return true;
  }





  /**
   *register an user
   * @param username: user name
   * * @param userRealName: user real name
   * * @param userPw: user password
   */
  register(username, userRealName, password):any {
    return this.http.get(this.hostUser + 'registrar.php?user='+ username + '&name='+ userRealName + '&password='+ password + '&appid='+ this.appId)
      .map(response => { return response.json() });
  }


  setNotificationsId(userId, notificationsId):Observable<any> {
    return this.http.get(this.hostUser + 'register-notifications-id.php?notificationsId='+ notificationsId + '&userId='+ userId)
      .map(response => { return response.json() });
  }

  /**
   * sends a request to server to reset password
   * @param resetEmail: email to recover password
   */
  resetPassword(resetEmail):any {
      return this.http.get(this.hostUser + 'senha.php?email='+ resetEmail)
        .map(response => { return response.json() });
    }
}
