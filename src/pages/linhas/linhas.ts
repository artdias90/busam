import { Component } from '@angular/core';
import { Platform, NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LoadingComponent } from "../../services/loading/loading";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Component({
  selector: 'page-linhas',
  templateUrl: 'linhas.html',
  providers: [GlobalVars, BusamService, LoadingComponent]
})

export class LinhasPage {
  title;
  description;
  horarios;
  horas;
  itinerario;
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
  cidade;
  temvolta;
  horarioDiariamente;
  horarioSegsex;
  horarioSab;
  horarioDom;
  horarioSegsab;
  horarioSabdom;
  horarioDiariamenteVolta;
  horarioSegsexVolta;
  horarioSabVolta;
  horarioDomVolta;
  horarioSegsabVolta;
  horarioSabdomVolta;
  sab;
  dom;
  aparecesegsexvolta;
  aparecesabvolta;
  aparecedomvolta;
  itinerarioTem;
  response;
  private options = { name: "data17.db", location: 'default', createFromLocation: 1 };  public names: String[] = [];
  public ruas;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              public navCtrl:NavController,
              public navParams:NavParams,
              private alertCtrl:AlertController,
              private busamService:BusamService,
              private actionsheetCtrl:ActionSheetController,
              private sqlite: SQLite,
              private loadingComponent:LoadingComponent) {}

  ionViewDidLoad() {
    this.obsLinha = this.navParams.get('item').obsLinha;
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').nomeLinha;
    this.number = this.navParams.get('item').numeroLinha;
    const d = new Date();
    this.curDay = d.getDay();
    this.finishedLoading = false;
    this.backgroundida = "white";
    this.colorida = "#3d99c2";
    this.ida = true;
    this.volta = false;
    this.background = "/assets/img/background.jpg";
    this.aparecesegsex = true;
    this.aparecesab = false;
    this.aparecedom = false;
    this.backgroundsemana = "white";
    this.backgroundsabado = "#13303e";
    this.backgrounddomingo = "#13303e";
    this.colorsemana = "#13303e";
    this.colorsabado = "white";
    this.colordomingo = "white";
    this.temvolta = true;
    this.itinerarioTem = false;

    this.cidade = this.busamService.verificaCidade();
    if (this.cidade == 1) {
      this.temvolta = false;
    }

    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql("SELECT * FROM itinerario WHERE linhaId = " + this.navParams.get('item').idLinha, {}).then((data) => {
        this.ruas = [];
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(data.rows.item(i).idLinha);
            this.ruas.push({ruaItinerario: data.rows.item(i).ruaItinerario});
          }
          this.itinerarioTem = true;
        }
      })
    });


    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql("SELECT * FROM horarios INNER JOIN observacao on idObservacao = obsHorario INNER JOIN frequencia on idFrequencia = frequenciaId WHERE horarios.linhaId = " + this.navParams.get('item').idLinha + " AND idFrequencia = 2 AND sentido = 0 ORDER BY txtHorario ASC", {}).then((data) => {
        this.diariamente = [];
        console.log("data: " + data.rows.length);
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(data.rows.item(i));
            this.diariamente.push({idHorario: data.rows.item(i).idHorario, txtHorario: data.rows.item(i).txtHorario, obsHorario: data.rows.item(i).obsHorario, linhaId: data.rows.item(i).linhaId, frequenciaId: data.rows.item(i).frequenciaId, sentido: data.rows.item(i).sentido, idObservacao: data.rows.item(i).idObservacao, txtObservacao: data.rows.item(i).txtObservacao, corObservacao: data.rows.item(i).corObservacao, idFrequencia: data.rows.item(i).idFrequencia, txtFrequencia: data.rows.item(i).txtFrequencia, corFrequencia: data.rows.item(i).corFrequencia});
          }
          this.horarioDiariamente = this.verificaHorario(this.diariamente);
          this.resultInMinutes = this.getHorario(this.horarionow);
        }
      });
    });

    // // this.loadingComponent.show();
    // for (this.i = 2; this.i < 8; this.i++) {
    //   this.sqlite.create(this.options).then((db: SQLiteObject) => {
    //   db.executeSql("SELECT * FROM horarios INNER JOIN observacao on idObservacao = obsHorario INNER JOIN frequencia on idFrequencia = frequenciaId WHERE horarios.linhaId = " + this.navParams.get('item').idLinha + " AND idFrequencia = " + this.i + " AND sentido = 0 ORDER BY txtHorario ASC", {}).then((data) => {
    //     this.response = [];
    //     console.log("data: " + data.rows.length);
    //       if(data.rows.length > 0) {
    //         for(var i = 0; i < data.rows.length; i++) {
    //           console.log(data.rows.item(i));
    //           this.response.push({idHorario: data.rows.item(i).idHorario, txtHorario: data.rows.item(i).txtHorario, obsHorario: data.rows.item(i).obsHorario, linhaId: data.rows.item(i).linhaId, frequenciaId: data.rows.item(i).frequenciaId, sentido: data.rows.item(i).sentido, idObservacao: data.rows.item(i).idObservacao, txtObservacao: data.rows.item(i).txtObservacao, corObservacao: data.rows.item(i).corObservacao, idFrequencia: data.rows.item(i).idFrequencia, txtFrequencia: data.rows.item(i).txtFrequencia, corFrequencia: data.rows.item(i).corFrequencia});
    //         }
    //       }
    //       console.log("response" + this.i);
    //       this.response =  JSON.stringify(this.response);
    //       this.retornou = this.getHorario(this.response);
    //       if (this.response) {
    //         if (this.response[0].idFrequencia == 2) {
    //           this.diariamente = this.response;
    //           this.checkNotifications(this.diariamente);
    //           this.horarioDiariamente = this.verificaHorario(this.response);
    //           // console.log("diariamante" + this.horarioDiariamente);
    //           this.resultInMinutes = this.getHorario(this.horarionow);}
    //         if (this.response[0].idFrequencia == 3) {
    //           this.segsex = this.response;
    //           this.checkNotifications(this.segsex);
    //           // if (this.curDay == 1 || this.curDay == 2 || this.curDay == 3 || this.curDay == 4 || this.curDay == 5) {
    //           this.horarioSegsex = this.verificaHorario(this.response);
    //           // console.log("seg sex" + this.horarioSegsex);
    //           this.resultInMinutes = this.getHorario(this.horarionow);}
    //         if (this.response[0].idFrequencia == 4) {
    //           this.sabado = this.response;
    //           this.checkNotifications(this.sabado);
    //           this.horarioSab = this.verificaHorario(this.response);
    //           this.resultInMinutes = this.getHorario(this.horarionow);}
    //         if (this.response[0].idFrequencia == 5) {
    //           this.domingo = this.response;
    //           this.checkNotifications(this.domingo);
    //           this.horarioDom = this.verificaHorario(this.response);
    //           this.resultInMinutes = this.getHorario(this.horarionow);}
    //         if (this.response[0].idFrequencia == 6) {
    //           this.segsab = this.response;
    //           this.checkNotifications(this.segsab);
    //           this.horarioSegsab = this.verificaHorario(this.response);
    //           this.resultInMinutes = this.getHorario(this.horarionow);}
    //         if (this.response[0].idFrequencia == 7) {
    //           this.sabdom = this.response;
    //           this.checkNotifications(this.sabdom);
    //           this.horarioSabdom = this.verificaHorario(this.response);
    //           this.resultInMinutes = this.getHorario(this.horarionow);}
    //         if (this.i == 7) {

    //         }
    //       }
    //     });
    //   });
    // }

    // for (this.i = 2; this.i < 8; this.i++) {
    //   console.log("consolelog: " + this.i);
    //   this.sqlite.create(this.options).then((db: SQLiteObject) => {
    //   db.executeSql("SELECT * FROM horarios INNER JOIN observacao on idObservacao = obsHorario INNER JOIN frequencia on idFrequencia = frequenciaId WHERE horarios.linhaId = " + this.navParams.get('item').idLinha + " AND idFrequencia = " + this.i + " AND sentido = 1 ORDER BY txtHorario ASC", {}).then((data) => {
    //     this.response = [];
    //       console.log(data);
    //       if(data.rows.length > 0) {
    //         for(var i = 0; i < data.rows.length; i++) {
    //           this.response.push({idHorario: data.rows.item(i).idHorario, txtHorario: data.rows.item(i).txtHorario, obsHorario: data.rows.item(i).obsHorario, linhaId: data.rows.item(i).linhaId, frequenciaId: data.rows.item(i).frequenciaId, sentido: data.rows.item(i).sentido, idObservacao: data.rows.item(i).idObservacao, txtObservacao: data.rows.item(i).txtObservacao, corObservacao: data.rows.item(i).corObservacao, idFrequencia: data.rows.item(i).idFrequencia, txtFrequencia: data.rows.item(i).txtFrequencia, corFrequencia: data.rows.item(i).corFrequencia});
    //         }
    //       }
    //       this.retornou = this.getHorario(this.response);
    //       // console.log(this.response[0].idFrequencia);
    //       if (this.response) {
    //         if (this.response[0].idFrequencia == 2) {
    //           this.diariamenteVolta = this.response;
    //           this.horarioDiariamenteVolta = this.verificaHorario(this.response);
    //         }
    //         if (this.response[0].idFrequencia == 3) {
    //           this.segsexVolta = this.response;
    //           this.horarioSegsexVolta = this.verificaHorario(this.response);
    //         }
    //         if (this.response[0].idFrequencia == 4) {
    //           this.sabadoVolta = this.response;
    //           this.horarioSabVolta = this.verificaHorario(this.response);
    //         }
    //         if (this.response[0].idFrequencia == 5) {
    //           this.domingoVolta = this.response;
    //           this.horarioDomVolta = this.verificaHorario(this.response);
    //         }
    //         if (this.response[0].idFrequencia == 6) {
    //           this.segsabVolta = this.response;
    //           this.horarioSegsabVolta = this.verificaHorario(this.response);
    //         }
    //         if (this.response[0].idFrequencia == 7) {
    //           this.sabdomVolta = this.response;
    //           this.horarioSabdomVolta = this.verificaHorario(this.response);
    //         }
    //       }
    //     });
    //   });
    // }




    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql("SELECT * FROM observacao WHERE linhaId = " + this.navParams.get('item').idLinha, {}).then((data) => {
        this.obs = [];
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(data.rows.item(i));
            this.obs.push({txtObservacao: data.rows.item(i).txtObservacao, corObservacao: data.rows.item(i).corObservacao});
          }
          this.itinerarioTem = true;
        } else {
          this.obs = false;
        }
      })
    });
    // this.loadingComponent.hide();
    this.finishedLoading = true;
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
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public alerta(titulo, mensagem) {
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
    horario.favorito = !horario.favorito;
    // this.lembreteService.addLembrete(horario, this.number);
    // dat.getTime();
  }

  private checkNotifications(horarios:any) {
    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
    // console.debug(favoritos);
    if (favoritos) {
      horarios.map((horario, index) => {
        let time = horario.txtHorario.split(/:|h/g);
        let dat = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), time[0], time[1]);
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
      })
    }
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
        // console.log(this.horarionow);
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


  sentidoida() {
    // console.log("ida");
    this.backgroundida = "white";
    this.colorida = "#3d99c2";
    this.backgroundvolta = "#3d99c2";
    this.colorvolta = "white";
    this.ida = true;
    this.volta = false;
  }

  sentidovolta() {
    // console.log("volta");
    this.backgroundvolta = "white";
    this.colorvolta = "#3d99c2";
    this.backgroundida = "#3d99c2";
    this.colorida = "white";
    this.ida = false;
    this.volta = true;
  }

  mostrasemana() {
    this.backgroundsemana = "white";
    this.backgroundsabado = "#13303e";
    this.backgrounddomingo = "#13303e";
    this.colorsemana = "#13303e";
    this.colorsabado = "white";
    this.colordomingo = "white";
    this.aparecesegsex = true;
    this.aparecesab = false;
    this.aparecedom = false;
    this.aparecesegsexvolta = true;
    this.aparecesabvolta = false;
    this.aparecedomvolta = false;
  }

  mostrasabado() {
    this.backgroundsemana = "#13303e";
    this.backgroundsabado = "white";
    this.backgrounddomingo = "#13303e";
    this.colorsemana = "white";
    this.colorsabado = "#13303e";
    this.colordomingo = "white";
    this.aparecesegsex = false;
    this.aparecesab = true;
    this.aparecedom = false;
    this.aparecesegsexvolta = false;
    this.aparecesabvolta = true;
    this.aparecedomvolta = false;
  }

  mostradomingo() {
    this.backgroundsemana = "#13303e";
    this.backgroundsabado = "#13303e";
    this.backgrounddomingo = "white";
    this.colorsemana = "white";
    this.colorsabado = "white";
    this.colordomingo = "#13303e";
    this.aparecesegsex = false;
    this.aparecesab = false;
    this.aparecedom = true;
    this.aparecesegsexvolta = false;
    this.aparecesabvolta = false;
    this.aparecedomvolta = true;
  }
}