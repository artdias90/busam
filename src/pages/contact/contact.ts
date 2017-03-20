import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  nome;
  email;
  constructor(public navCtrl: NavController, private http:Http) {

  }

  cadastrar(){
    this.http.get('http://api.codeam.com.br/busam/promocao.php?nome=' + this.nome + '&email=' + this.email)
      .subscribe(data => {
        alert(this.nome + ", parabéns, você já está concorrendo!");
      });
  }
}
