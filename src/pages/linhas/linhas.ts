import { Component } from '@angular/core';
import { Platform, NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LoadingComponent } from "../../services/loading/loading";

import { LembreteService } from '../../services/lembrete/lembrete.service';

@Component({
  selector: 'page-linhas',
  templateUrl: 'linhas.html',
  providers: [GlobalVars, BusamService, LembreteService, LoadingComponent]
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
  sabdom;
  verificado;
  d1;
  d2;
  diff;
  linha;
  linhaFavorita;
  diariamenteVolta;
  sabadoVolta;
  domingoVolta;
  segsexVolta;
  segsabVolta;
  sabdomVolta;
  backgroundvolta;
  colorvolta;
  backgroundida;
  colorida;
  ida;
  volta;
  background;
  finishedLoading;
  aparecesegsex;
  aparecesab;
  aparecedom;
  backgroundsemana;
  backgroundsabado;
  backgrounddomingo;
  colorsemana;
  colorsabado;
  colordomingo;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              public navCtrl:NavController,
              public navParams:NavParams,
              private alertCtrl:AlertController,
              private busamService:BusamService,
              private actionsheetCtrl: ActionSheetController,
              private loadingComponent:LoadingComponent,
              private lembreteService:LembreteService) {}

  ionViewDidLoad() {
    this.obsLinha = this.navParams.get('item').obsLinha;
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').nomeLinha;
    this.number = this.navParams.get('item').numeroLinha;
    const d = new Date();
    this.curDay = d.getDay();
    this.finishedLoading = false;
    this.backgroundida = "white";
    this.colorida = "#3f51b5";
    this.ida = true;
    this.volta = false;
    this.background = "/assets/img/background.jpg";
    this.aparecesegsex = true;
    this.aparecesab = false;
    this.aparecedom = false;
    this.backgroundsemana = "white";
    this.backgroundsabado = "#3f51b5";
    this.backgrounddomingo = "#3f51b5";
    this.colorsemana = "#3f51b5";
    this.colorsabado = "white";
    this.colordomingo = "white";



    this.loadingComponent.show();
    for (this.i = 2; this.i < 8; this.i++) {
      this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, this.i, 0).subscribe(
        response => {
          this.retornou = this.getHorario(response);
          if (response) {
            if (response[0].idFrequencia == 2) {
              this.diariamente = response;
              this.checkNotifications(this.diariamente);
              this.horarionow = this.verificaHorario(response);
              this.resultInMinutes = this.getHorario(this.horarionow);
            }
            if (response[0].idFrequencia == 3) {
              this.segsex = response;
              this.checkNotifications(this.segsex);
              if (this.curDay == 1 || this.curDay == 2 || this.curDay == 3 || this.curDay == 4 || this.curDay == 5) {
                this.horarionow = this.verificaHorario(response);
                this.resultInMinutes = this.getHorario(this.horarionow);
              }
            }
            if (response[0].idFrequencia == 4) {
              this.sabado = response;
              this.checkNotifications(this.sabado);
              if (this.curDay == 6) {
                this.horarionow = this.verificaHorario(response);
                this.resultInMinutes = this.getHorario(this.horarionow);
              }
            }
            if (response[0].idFrequencia == 5) {
              this.domingo = response;
              this.checkNotifications(this.domingo);
              if (this.curDay == 0) {
                this.horarionow = this.verificaHorario(response);
                this.resultInMinutes = this.getHorario(this.horarionow);
              }
            }
            if (response[0].idFrequencia == 6) {
              this.segsab = response;
              this.checkNotifications(this.segsab);
              if (this.curDay == 1 || this.curDay == 2 || this.curDay == 3 || this.curDay == 4 || this.curDay == 5 || this.curDay == 6) {
                this.horarionow = this.verificaHorario(response);
                this.resultInMinutes = this.getHorario(this.horarionow);
              }
            }
            if (response[0].idFrequencia == 7) {
              this.sabdom = response;
              this.checkNotifications(this.sabdom);
              if (this.curDay == 0 || this.curDay == 6) {
                this.horarionow = this.verificaHorario(response);
                this.resultInMinutes = this.getHorario(this.horarionow);
              }
            }
            if (this.i == 7) {
              this.loadingComponent.hide();
              this.finishedLoading = true;
            }
          }
        });
    }




    for (this.i = 2; this.i < 8; this.i++) {
      this.horarios = this.busamService.getHorarios(this.navParams.get('item').idLinha, this.i, 1).subscribe(
        response => {
          this.retornou = this.getHorario(response);
          if (response) {
            if (response[0].idFrequencia == 2) {
              this.diariamenteVolta = response;
            }
            if (response[0].idFrequencia == 3) {
              this.segsexVolta = response;
            }
            if (response[0].idFrequencia == 4) {
              this.sabadoVolta = response;
            }
            if (response[0].idFrequencia == 5) {
              this.domingoVolta = response;
            }
            if (response[0].idFrequencia == 6) {
              this.segsabVolta = response;
            }
            if (response[0].idFrequencia == 7) {
              this.sabdomVolta = response;
            }

          }
        });
    }


    this.itinerario = this.busamService.getItinerarios(this.navParams.get('item').idLinha).subscribe(
      response => {
        this.ruas = response;
        this.loadingComponent.hide();
        this.finishedLoading = true;
      },
      error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

    this.observacoes = this.busamService.getObs(this.navParams.get('item').idLinha).subscribe(
      response => {this.obs = response;},
      error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});
  }

  showItinerario() {
    this.horario = false;
  }

  showHorarios() {

    this.horario = true;
  }

  openMenu(items) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opcoes',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Alarme',
          icon: 'alarm',
          handler: () => {
            this.saveHorario(items)
          }
        },
        {
          text: 'Reportar Erro',
          icon: 'bug',
          handler: () => {
            this.reportarHorario(items)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  public alerta(titulo, mensagem){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  reportarHorario(horario) {
    this.busamService.reportaHorario(this.number, horario.txtHorario, this.ida).subscribe(
      response => {
        let alert = this.alertCtrl.create({
          title: 'Obrigado',
          subTitle: `Verificaremos o problema com o horário o mais rápido possível!`,
          buttons: ['OK']
        });
        alert.present();
      },
      error => {console.log("erro", "Ocorreu um erro. Tente novamente.");});

  }

  saveHorario(horario) {
    // this.alerta('', horario);
    horario.favorito = !horario.favorito;
    let time = horario.txtHorario.split(/h/g);
    let dat = new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getHours() > time[0]? new Date().getDate() + 1 : new Date().getDate()), time[0], time[1], 0, 0);
    // console.log(dat, dat.getUTCMilliseconds());

    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
    let added = false;
    if (favoritos) {
      let found = false;
      favoritos.map((linha, index) => {
        if (linha.numero === this.number) {
          found = true;
          if (linha.horarios.indexOf(dat.getTime()) === -1) {
            added = true;
            linha.horarios.push(dat.getTime());
          } else {
            linha.horarios.splice(linha.horarios.indexOf(dat.getTime()), 1);
            if(linha.horarios.length === 0) {
              favoritos.splice(index, 1);
            }
          }
        }
      })
      if (!found) {
        favoritos.push({
          numero: this.number,
          horarios: [dat.getTime()]
        });
      }
    } else {
      favoritos = [];
      added = true;
      favoritos.push({
        numero: this.number,
        horarios: [dat.getTime()]
      });
    }

    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: `Lembrete de horário ${added? 'salvo': 'apagado'} com sucesso!`,
      buttons: ['OK']
    });
    alert.present();
    window.localStorage.setItem('horarios_favoritos', JSON.stringify(favoritos));
    this.lembreteService.updateLembretes();
    // dat.getTime();
  }

  private checkNotifications(horarios:any) {
    horarios.map((horario, index) => {
      let time = horario.txtHorario.split(/h/g);
      let dat = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), time[0], time[1]);
      let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
      if (favoritos) {
        let found = false;
        favoritos.map((linha, index) => {
          if (linha.numero === this.number) {
            found = true;
            if (linha.horarios.indexOf(dat.getTime()) === -1) {
              horario.favorito = false;
            } else {
              horario.favorito = true;
            }
          }
        })
        if (!found) {
          favoritos.push({
            numero: this.number,
            horarios: [dat.getTime()]
          });
        }
      } else {
        favoritos = [];
        favoritos.push({
          numero: this.number,
          horarios: [dat.getTime()]
        });
      }
    })

  }

  verificaHorario(response) {
    const d = new Date();
    this.curHour = d.getHours();
    this.curMin = d.getMinutes();
    this.curDay = d.getDay();
    this.d2 = new​
    Date(0, 0, 0, this.curHour, this.curMin);
    for (var i = 0; i < response.length; i++) {
      this.hora = response[i].txtHorario.substring(0, 2);
      this.minuto = response[i].txtHorario.substring(3, 5);
      this.d1 = new​
      Date(0, 0, 0, this.hora, this.minuto);
      if (this.d1 > this.d2) {
        this.horarionow = this.hora + 'h' + this.minuto;
        console.log(this.horarionow);
        return this.horarionow;
      }
    }
    this.hora = response[0].txtHorario.substring(0, 2);
    this.minuto = response[0].txtHorario.substring(3, 5);
    this.horarionow = this.hora + 'h' + this.minuto;
    return this.horarionow;
  }

  getHorario(response) {
    var startTime = new Date('2012/10/09 ' + this.curHour + ':' + this.curMin + ' ');
    var endTime = new Date('2012/10/09 ' + this.hora + ':' + this.minuto + ' ');
    var difference = endTime.getTime() - startTime.getTime();
    this.resultInMinutes = Math.round(difference / 60000);
    return this.resultInMinutes;
  }

  idlinhaFavorita() {
    this.linhaFavorita = this.navParams.get('item').idLinha;
    this.linha = localStorage.setItem("idLinhaBusam", this.linhaFavorita);
  }


  sentidoida(){
    console.log("ida");
    this.backgroundida = "white";
    this.colorida = "#3f51b5";
    this.backgroundvolta = "#3f51b5";
    this.colorvolta = "white";
    this.ida = true;
    this.volta = false;
  }

  sentidovolta(){
    console.log("volta");
    this.backgroundvolta = "white";
    this.colorvolta = "#3f51b5";
    this.backgroundida = "#3f51b5";
    this.colorida = "white";
    this.ida = false;
    this.volta = true;
  }

  mostrasemana() {
    this.backgroundsemana = "white";
    this.backgroundsabado = "#3f51b5";
    this.backgrounddomingo = "#3f51b5";
    this.colorsemana = "#3f51b5";
    this.colorsabado = "white";
    this.colordomingo = "white";
    this.aparecesegsex = true;
    this.aparecesab = false;
    this.aparecedom = false;
  }

  mostrasabado() {
    this.backgroundsemana = "#3f51b5";
    this.backgroundsabado = "white";
    this.backgrounddomingo = "#3f51b5";
    this.colorsemana = "white";
    this.colorsabado = "#3f51b5";
    this.colordomingo = "white";
    this.aparecesegsex = false;
    this.aparecesab = true;
    this.aparecedom = false;
  }

  mostradomingo() {
    this.backgroundsemana = "#3f51b5";
    this.backgroundsabado = "#3f51b5";
    this.backgrounddomingo = "white";
    this.colorsemana = "white";
    this.colorsabado = "white";
    this.colordomingo = "#3f51b5";
    this.aparecesegsex = false;
    this.aparecesab = false;
    this.aparecedom = true;
  }
}
