import { LocalNotifications } from 'ionic-native';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class LembreteService {

  constructor (private alertCtrl:AlertController) {
  }

addLembrete(horario, linha) {
  let time = horario.txtHorario.split(/h/g);
    let dat = new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getHours() > time[0]? new Date().getDate() + 1 : new Date().getDate()), time[0], time[1], 0, 0);
    // console.log(dat, dat.getUTCMilliseconds());

    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
    let added = false;
    if (favoritos) {
      let found = false;
      favoritos.map((linha, index) => {
        if (linha.numero === linha) {
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
          numero: linha,
          horarios: [dat.getTime()]
        });
      }
    } else {
      favoritos = [];
      added = true;
      favoritos.push({
        numero: linha,
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
    this.updateLembretes();
}


  /**
   * authenticates user.
   * @param user: username
   * @param password: password
   */
  updateLembretes():any{
    LocalNotifications.cancelAll();
    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
      if (favoritos) {
        favoritos.map((linha, index) => {
          linha.horarios.map((horario, index) => {
            LocalNotifications.schedule({
              text: `alerta: linha ${linha.numero} - ${new Date(horario).getHours()}:${new Date(horario).getMinutes()} - ônibus a caminho`,
              at: new Date(new Date(horario).getTime() - 300000),
              icon: 'res:/ic_stat_onesignal_default.png',
              sound: null
            });
          })
        })
      }
  }

}

