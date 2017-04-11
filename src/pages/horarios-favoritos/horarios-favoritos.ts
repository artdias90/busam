import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { GlobalVars } from "../../services/globals/globals";
import { LembreteService } from '../../services/lembrete/lembrete.service';

@Component({
  selector: 'horarios-favoritos',
  templateUrl: 'horarios-favoritos.html',
  providers: [GlobalVars, LembreteService]
})

export class HorariosFavoritosPage {
  horarios;
  constructor(GlobalVars:GlobalVars,
              public navCtrl:NavController,
              private alertCtrl:AlertController,
              private lembreteService:LembreteService) {

    this.horarios = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
  }



  deleteHorario(paramNumero, horario) {
    this.horarios.map((linha, index) => {
        if (linha.numero === paramNumero) {
          linha.horarios.splice(linha.horarios.indexOf(horario), 1);
          if(linha.horarios.length === 0) {
            this.horarios.splice(index, 1);
          }
        }
      })

    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: `Lembrete de horário apagado com sucesso!`,
      buttons: ['OK']
    });

    alert.present();
    window.localStorage.setItem('horarios_favoritos', JSON.stringify(this.horarios));
    this.lembreteService.deleteLembrete(paramNumero, horario);
  }

  printHorario(timestamp){
    return `${("0" + new Date(timestamp).getHours()).slice(-2)}:${("0" + new Date(timestamp).getMinutes()).slice(-2)}`;
  }

}


