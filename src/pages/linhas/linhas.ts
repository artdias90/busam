import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {GlobalVars} from "../../services/globals/globals";
import {BusamService} from "../../services/busam/busam";

@Component({
  selector: 'page-linhas',
  templateUrl: 'linhas.html',
  providers: [GlobalVars, BusamService]
})
export class LinhasPage {
  title;
  description;
  horarios;
  horas;
  itinerario;
  ruas;
  obs;
  observacoes;
  obsLinha;
  diariamente;
  sabado;
  domingo;
  segsex;
  segsab;
  horario = true;
  number;
  hora;
  minuto;
  curHour;
  curMin;
  stop = 0;
  horarionow;
  curDay;
  resultInMinutes;
  resposta;
  teste;
  i;
  retornou;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private busamService: BusamService
  ){}

  ionViewDidLoad() {
    const d = new Date();
    this.curHour = d.getHours();
    this.curMin = d.getMinutes();
    this.curDay = d.getDay();
    this.obsLinha = this.navParams.get('item').obsLinha;
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').nomeLinha;
    this.number = this.navParams.get('item').numeroLinha;

for(this.i=2;this.i<8;this.i++){
    this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, this.i).subscribe(
    response => {
      this.retornou = this.getHorario(response);
      if(response){
        if(response[0].idFrequencia == 2){
          this.diariamente = response;
        }
        if(response[0].idFrequencia == 3){
          this.segsex = response;
        }
        if(response[0].idFrequencia == 4){
          this.sabado = response;
        }
        if(response[0].idFrequencia == 5){
          this.domingo = response;
        }
        if(response[0].idFrequencia == 6){
          this.segsab = response;
        }
        if(response[0].idFrequencia == 7){
          this.sabdom = response;
        }

      }
    });
}
    

    this.itinerario = this.busamService.getItinerarios(this.navParams.get('item').idLinha).subscribe(
    response => {this.ruas = response;},
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

    this.observacoes = this.busamService.getObs(this.navParams.get('item').idLinha).subscribe(
    response => {this.obs = response;},
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});
  }

  showItinerario(){
    this.horario = false;
  }

  showHorarios(){
    this.horario = true;
  }

  verificaHorario(hora, minuto, anterior){
    var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' ');
    if(anterior == 0){
      var endTime = new Date('2012/10/09 '+ hora +':' + minuto + ' ');
    } else {
      var endTime = new Date('2012/10/10 '+ hora +':' + minuto + ' ');
    }
    var difference = endTime.getTime() - startTime.getTime();
    this.resultInMinutes = Math.round(difference / 60000);

    return this.resultInMinutes;
  }

  getHorario(response){
    console.log(response);
    return "teste";
  }
}
