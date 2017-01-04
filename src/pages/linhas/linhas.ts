import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVars} from "../../services/globals/globals";
import {BusamService} from "../../services/busam/busam";
/*
  Generated class for the Linhas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
    console.log(this.curDay);
    console.log(this.curHour);
    console.log(this.curMin);

  	console.log(this.navParams.get('item'));
    this.obsLinha = this.navParams.get('item').obsLinha;
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').nomeLinha;
    this.number = this.navParams.get('item').numeroLinha;

    this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, 2).subscribe(
    response => {
      this.diariamente = response;
      if(this.diariamente){
        for (var i=0; i<this.diariamente.length; i++){
          this.hora = this.diariamente[i].txtHorario.substring(0,2);
          this.minuto = this.diariamente[i].txtHorario.substring(3,5);
          if(parseInt(this.curHour) == parseInt(this.hora)){
            if(parseInt(this.curMin) < parseInt(this.minuto)){
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
            var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            this.resultInMinutes = Math.round(difference / 60000);
            }
          } else if(parseInt(this.curHour) < parseInt(this.hora)){
            if(this.stop == 0){
              this.horarionow = this.hora + 'h' + this.minuto;
              var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
              this.stop = 1;  
            }
          }
        }
        if(!this.horarionow){
            this.hora = this.diariamente[0].txtHorario.substring(0,2);
            this.minuto = this.diariamente[0].txtHorario.substring(3,5);
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
            var endTime = new Date('2012/10/10 '+ this.hora +':' + this.minuto + ' ');
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            this.resultInMinutes = Math.round(difference / 60000);
          }
      }

    },
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

    this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, 3).subscribe(
    response => {
      this.segsex = response;
      if(this.segsex){
        if(this.curDay == 1 || this.curDay == 2 || this.curDay == 3 || this.curDay == 4 || this.curDay == 5){
          for (var i=0; i<this.segsex.length; i++){
            this.hora = this.segsex[i].txtHorario.substring(0,2);
            this.minuto = this.segsex[i].txtHorario.substring(3,5);
            if(parseInt(this.curHour) == parseInt(this.hora)){
              if(parseInt(this.curMin) < parseInt(this.minuto)){
                this.horarionow = this.hora + 'h' + this.minuto;
                var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
              }
            } else if(parseInt(this.curHour) < parseInt(this.hora)){
              if(this.stop == 0){
                this.horarionow = this.hora + 'h' + this.minuto;
                var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
                this.stop = 1;  
              }
            }
          }
          if(!this.horarionow){
            this.hora = this.segsex[0].txtHorario.substring(0,2);
            this.minuto = this.segsex[0].txtHorario.substring(3,5);
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
            var endTime = new Date('2012/10/10 '+ this.hora +':' + this.minuto + ' ');
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            this.resultInMinutes = Math.round(difference / 60000);
          }
        }
      }
    },
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

    this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, 4).subscribe(
    response => {
      this.sabado = response;
      if(this.sabado && this.curDay == 6){
        for (var i=0; i<this.sabado.length; i++){
          this.hora = this.sabado[i].txtHorario.substring(0,2);
          this.minuto = this.sabado[i].txtHorario.substring(3,5);
          if(parseInt(this.curHour) == parseInt(this.hora)){
            if(parseInt(this.curMin) < parseInt(this.minuto)){
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
            }
          } else if(parseInt(this.curHour) < parseInt(this.hora)){
            if(this.stop == 0){
              this.horarionow = this.hora + 'h' + this.minuto;
              var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
              this.stop = 1;  
            }
          }
        }
        if(!this.horarionow){
            this.hora = this.sabado[0].txtHorario.substring(0,2);
            this.minuto = this.sabado[0].txtHorario.substring(3,5);
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
            var endTime = new Date('2012/10/10 '+ this.hora +':' + this.minuto + ' ');
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            this.resultInMinutes = Math.round(difference / 60000);
          }
      }
    },
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

    this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, 5).subscribe(
    response => {
      this.domingo = response;
      if(this.domingo && this.curDay == 0){
        for (var i=0; i<this.domingo.length; i++){
          this.hora = this.domingo[i].txtHorario.substring(0,2);
          this.minuto = this.domingo[i].txtHorario.substring(3,5);
          if(parseInt(this.curHour) == parseInt(this.hora)){
            if(parseInt(this.curMin) < parseInt(this.minuto)){
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
            }
          } else if(parseInt(this.curHour) < parseInt(this.hora)){
            if(this.stop == 0){
              this.horarionow = this.hora + 'h' + this.minuto;
              var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
              this.stop = 1;  
            }
          }
        }
        if(!this.horarionow){
            this.hora = this.domingo[0].txtHorario.substring(0,2);
            this.minuto = this.domingo[0].txtHorario.substring(3,5);
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
            var endTime = new Date('2012/10/10 '+ this.hora +':' + this.minuto + ' ');
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            this.resultInMinutes = Math.round(difference / 60000);
          }
      }
    },
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

    this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, 6).subscribe(
    response => {
      this.segsab = response;
      if(this.segsab){
        if(this.curDay == 1 || this.curDay == 2 || this.curDay == 3 || this.curDay == 4 || this.curDay == 5 || this.curDay == 6){
          for (var i=0; i<this.segsab.length; i++){
            this.hora = this.segsab[i].txtHorario.substring(0,2);
            this.minuto = this.segsab[i].txtHorario.substring(3,5);
            if(parseInt(this.curHour) == parseInt(this.hora)){
              if(parseInt(this.curMin) < parseInt(this.minuto)){
              this.horarionow = this.hora + 'h' + this.minuto;
              var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
              }
            } else if(parseInt(this.curHour) < parseInt(this.hora)){
              if(this.stop == 0){
                this.horarionow = this.hora + 'h' + this.minuto;
                var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
                var endTime = new Date('2012/10/09 '+ this.hora +':' + this.minuto + ' ');
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                this.resultInMinutes = Math.round(difference / 60000);
                this.stop = 1;  
              }
            }
          }
          if(!this.horarionow){
            this.hora = this.segsab[0].txtHorario.substring(0,2);
            this.minuto = this.segsab[0].txtHorario.substring(3,5);
            this.horarionow = this.hora + 'h' + this.minuto;
            var startTime = new Date('2012/10/09 '+ this.curHour +':' + this.curMin + ' '); 
            var endTime = new Date('2012/10/10 '+ this.hora +':' + this.minuto + ' ');
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            this.resultInMinutes = Math.round(difference / 60000);
          }
        }
      }
    },
    error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});
    
    this.itinerario = this.busamService.getItinerarios(this.navParams.get('item').idLinha).subscribe(
    response => {
      this.ruas = response;
    },
    error => {
      console.log("erro", "Ocorreu um erro. Tente novamente.");
    });

    this.observacoes = this.busamService.getObs(this.navParams.get('item').idLinha).subscribe(
    response => {
      this.obs = response;
    },
    error => {
      console.log("erro", "Ocorreu um erro. Tente novamente.");
    });
  }

  showItinerario(){
    this.horario = false;
  }

  showHorarios(){
    this.horario = true;
  }
}
