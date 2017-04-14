import { LocalNotifications } from 'ionic-native';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class LembreteService {

  constructor(private alertCtrl:AlertController) {
  }

  addLembrete(horario, numeroLinha) {
    let time = horario.txtHorario.split(/:|h/g);
    let dat = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), time[0], time[1], 0, 0);
    // console.debug(time);
    // console.log(dat, dat.getUTCMilliseconds());

    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
    let added = false;
    if (favoritos) {
      let found = false;
      favoritos.map((linhaFavoritada, index) => {
        if (linhaFavoritada.numero === numeroLinha) {
          found = true;
          if (linhaFavoritada.horarios.indexOf(dat.getTime()) === -1) {
            added = true;
            linhaFavoritada.horarios.push(dat.getTime());
          } else {
            // remover o lembrete
            linhaFavoritada.horarios.splice(linhaFavoritada.horarios.indexOf(dat.getTime()), 1);
            // remover a linha
            if (linhaFavoritada.horarios.length === 0) {
              favoritos.splice(index, 1);
            }
          }
        }
      })
      if (!found) {
        favoritos.push({
          numero: numeroLinha,
          horarios: [dat.getTime()]
        });
      }
    } else {
      favoritos = [];
      added = true;
      favoritos.push({
        numero: numeroLinha,
        horarios: [dat.getTime()]
      });
    }

    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: `Lembrete de horário atualizado com sucesso!`,
      buttons: ['OK']
    });
    alert.present();
    window.localStorage.setItem('horarios_favoritos', JSON.stringify(favoritos));
    this.updateLembretes();
  }

  updateLembretes():any {
    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
    let horariosArray = [];
    if (favoritos) {
      favoritos.map((linha, index) => {
        linha.horarios.map((horario, index) => {
          horariosArray.push({
            id: `${linha.numero}_${new Date(horario).getHours()}:${new Date(horario).getMinutes()}`,
            text: `alerta: linha ${linha.numero} - ${new Date(horario).getHours() < 10? '0' + new Date(horario).getHours() : new Date(horario).getHours()  }:${new Date(horario).getMinutes() < 10? '0' + new Date(horario).getMinutes() :new Date(horario).getMinutes() } - saindo do terminal em 15 minutos!`,
            firstAt: new Date(new Date(horario).getTime() - 900000),
            every: 'day',
            icon: 'res:/ic_stat_onesignal_default.png',
            sound: null
          });
        })
      })
      LocalNotifications.schedule(horariosArray);
    }
  }

  deleteLembrete(linha, horario) {
    LocalNotifications.cancel(`${linha}_${new Date(horario).getHours()}:${new Date(horario).getMinutes()}`)
  }

}
