import { Component } from '@angular/core';
import { Platform, NavController, AlertController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { GlobalVars } from "../../services/globals/globals";
import { LembreteService } from '../../services/lembrete/lembrete.service';

@Component({
  selector: 'horarios-favoritos',
  templateUrl: 'horarios-favoritos.html',
  providers: [GlobalVars, LembreteService]
})

export class HorariosFavoritosPage {
  private horarios;
  constructor(GlobalVars:GlobalVars,
              public navCtrl:NavController,
              private alertCtrl:AlertController,
              private lembreteService:LembreteService) {

    this.horarios = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
  }



  deleteHorario(paramNumero, horario) {
    this.horarios.map((linha) => {
        if (linha.numero === paramNumero) {
          linha.horarios.splice(linha.horarios.indexOf(horario), 1);
        }
      })

    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: `Lembrete de horário apagado com sucesso!`,
      buttons: ['OK']
    });

    alert.present();
    window.localStorage.setItem('horarios_favoritos', JSON.stringify(this.horarios));
    this.lembreteService.updateLembretes();
  }

  printHorario(timestamp){
    return `${new Date(timestamp).getHours()} - ${new Date(timestamp).getMinutes()}`;
  }

}


