import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html'
})
export class TipsPage {
  randomNr: number;
  logos: any;
  texts: any;

  constructor(public navCtrl: NavController) {

    this.logos = [
      'walk','walk','walk'
    ]

    this.texts = [
      'Clique na estrela para favoritar uma linha e mostrar sempre no topo da lista!',
      'Você pode salvar qualquer horário e receber uma notificação 5 minutos antes da partida',
      'Seus lembretes podem ser conferidos no menu "Meus Lembretes"',
    ]

  }

  ionViewWillEnter() {
    this.randomNr = this.getRandomInt(0,2);


  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
