import { LocalNotifications } from 'ionic-native';
import { Injectable } from '@angular/core';

@Injectable()
export class LembreteService {

  constructor () {
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

