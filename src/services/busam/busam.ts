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
  cidade;
  linha;

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
  getLinhas(cidade):any{
    return this.http.get(this.host + 'linhas.php?id='+ cidade)
      .map(response => { return response.json() });
  }

  getCidades():any{
    return this.http.get(this.host + 'cidades.php')
      .map(response => { return response.json() });
  }

  getHorarios(linha, frequencia, sentido):any{
    return this.http.get(this.host + 'horarios.php?id='+ linha + '&frequencia='+ frequencia + '&sentido='+ sentido)
      .map(response => { return response.json() });
  }

  getItinerarios(linha):any{
    return this.http.get(this.host + 'itinerario.php?id='+ linha)
      .map(response => { return response.json() });
  }

  getObs(linha):any{
    return this.http.get(this.host + 'observacoes.php?id='+ linha)
      .map(response => { return response.json() });
  }

  verificaCidade():any{
    this.cidade = localStorage.getItem("idCidadeBusam");
    return this.cidade;
  }

  reportaHorario(linha, horario, ida):any{
    return this.http.get(`${this.host}reporta_horario.php?linha=${linha}&horario=${horario}&sentido=${ida == true? 'ida' : 'volta' }`)
      .map(response => { return response.json() });
  }

  verificaLinha():any{
    this.linha = localStorage.getItem("idLinhaBusam");
    return this.linha;
  }

  resetaCidade():any{
    this.linha = localStorage.removeItem("idCidadeBusam");
  }

}
