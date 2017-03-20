import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, AlertController  } from 'ionic-angular';
import { StartPage } from "../start/start";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  nome;
  email;
  constructor(public navCtrl: NavController, private http:Http, public alertCtrl: AlertController) {

  }

  cadastrar() {
    this.http.get('http://api.codeam.com.br/busam/promocao.php?nome=' + this.nome + '&email=' + this.email)
      .subscribe(data => {
        alert(this.nome + ", parabéns, você já está concorrendo!");
        this.navCtrl.push(StartPage, {});
      });
  }

  regulamento() {
    let confirm = this.alertCtrl.create({
      title: 'Regras da Promoção',
      message: '1- O sorteio será de um ovo ao leite Kopenhagen de 150 gramas <br><br> 2- Para concorrer basta o participante cadastrar o nome e o e-mail. É totalmente grátis. <br><br> 3- O sorteio será realizado no dia 14/04. <br><br> 4- O ganhador será comunicado somente pelo e-mail cadastrado, não obtendo resposta, haverá um novo sorteio. <br><br> 5- O aplicativo não tem nenhuma relação com a Kopenhagen, apenas utilizou seu produto como prêmio.',
      buttons: [
        {
          text: 'Discordo',
          handler: () => {
            this.navCtrl.push(StartPage, {});
          }
        },
        {
          text: 'Concordo',
          handler: () => {
            console.log('Concordou');
          }
        }
      ]
    });
    confirm.present();
  }
}
