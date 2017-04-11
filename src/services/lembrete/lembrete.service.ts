import { LocalNotifications } from 'ionic-native';
import { Injectable } from '@angular/core';

@Injectable()
export class LembreteService {

  constructor () {
  }

  
  updateLembretes():any {
    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
    let notificationsArray: any[];
      if (favoritos) {
        favoritos.map((linha, index) => {
          linha.horarios.map((horario, index) => {
            notificationsArray.push({
              id: `${linha.numero}_${new Date(horario).getHours()}:${new Date(horario).getMinutes()}`,
              text: `alerta: linha ${linha.numero} - ${new Date(horario).getHours()}:${new Date(horario).getMinutes()} - sai do terminal em 15 minutos`,
              firstAt: new Date(new Date(horario).getTime() - 900000),
              every: 'hour',
              icon: 'res:/ic_stat_onesignal_default.png',
              sound: null
            });
          })
        });
        LocalNotifications.schedule(notificationsArray);
      }
  }
}