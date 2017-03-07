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
    let favoritos:any = JSON.parse(window.localStorage.getItem('horarios_favoritos'));
      if (favoritos) {
        favoritos.map((linha, index) => {
          linha.horarios.map((horario, index) => {
            console.log(new Date(new Date(horario).getTime()));
            LocalNotifications.schedule({
              text: `alerta: linha ${linha.numero} - ônibus a caminho`,
              at: new Date(new Date(horario).getTime()),
              led: 'FF0000',
              sound: null
            });
          })
        })
      }
  }

}

