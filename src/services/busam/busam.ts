import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {GlobalVars} from "../globals/globals";

@Injectable()
export class BusamService {

  hostUser: any;
  host: any;
  key_id: any;
  key_usuario: any;
  key_senha: any;
  appId: any;
  names: Array<string>;

  constructor (private http: Http, GlobalVars: GlobalVars) {
    this.http = http;
    this.hostUser = GlobalVars.hostUser;
    this.host = GlobalVars.host;
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
  getLinhas():any{
    console.log("getLinhas22222");
    return this.http.get(this.host + 'linhas.php?id='+ this.appId)
      .map(response => { return response.json() });
  }

  getHorarios(linha, frequencia):any{
    console.log("getHorarios");
    return this.http.get(this.host + 'horarios.php?id='+ linha + '&frequencia='+ frequencia)
      .map(response => { return response.json() });
  }

  getItinerarios(linha):any{
    console.log("getItinerarios");
    return this.http.get(this.host + 'itinerario.php?id='+ linha)
      .map(response => { return response.json() });
  }

   getObs(linha):any{
    console.log("getObs");
    return this.http.get(this.host + 'observacoes.php?id='+ linha)
      .map(response => { return response.json() });
  }

}
