import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LinhasPage } from "../linhas/linhas";
import { StartPage } from "../start/start";
import { HorariosFavoritosPage } from '../horarios-favoritos/horarios-favoritos';
import { LoadingComponent } from "../../services/loading/loading";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService, GlobalVars, BusamService, LoadingComponent]
})

export class HomePage {
  loggedInUserInfo:any;
  linhas:any;
  item:any;
  currResults:any;
  aviso;
  imagem;
  link;
  imagem_footer;
  link_footer;
  
  cidade;
  searchBarItem;
  banner_campinas;

  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private loadingComponent:LoadingComponent,
              private busamService:BusamService) {
    this.cidade = this.busamService.verificaCidade();
    if(this.cidade == 2) {
      this.banner_campinas = true;
    } else {
      this.banner_campinas = false;
    }
    this.searchBarItem = '';
    this.aviso = this.busamService.getObs(0).subscribe(
      response => {
        this.aviso = response[0].txtObservacao;
        if(this.aviso == ""){
           this.aviso = false;
        }
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    this.loadingComponent.show();
    this.imagem = this.busamService.getObs(9999).subscribe(
      response => {
        this.imagem = response[0].txtObservacao;
        this.link =  response[0].corObservacao;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    this.imagem_footer = this.busamService.getObs(9999).subscribe(
      response => {
        this.imagem_footer = response[0].txtObservacao;
        this.link_footer = response[0].corObservacao;
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });

    this.linhas = this.busamService.getLinhas(this.cidade).subscribe(
      response => {
        this.item = response;
        let favoritas:any = JSON.parse(window.localStorage.getItem('linha_favoritas'));
        if(favoritas) {
          this.item.map((linha, index) => {
            linha.favorita = false;
            if(favoritas.indexOf(linha.idLinha) !== -1) {
              linha.favorita = true;
            }
          })
          this.item.sort((linhaa, linhab) => {
            return (linhaa.favorita === linhab.favorita)? 0 : linhaa.favorita? -1 : 1;
          })
          console.log(this.item);
        }
        this.loadingComponent.hide();
      },
      error => {
        console.log("erro", "Ocorreu um erro. Tente novamente.");
      });





  }

  // favorita uma linha para que ela fique sempre no topo
  favoritar(event:any, item:any) {
    item.favorita = !item.favorita;
    console.log(item);
    event.stopPropagation();
    event.preventDefault();

    this.authService.addFavorite(item.idLinha);

    this.navCtrl.push(HomePage);
  }


  //BUSCA
  getLinhas(ev: any) {
    this.loadingComponent.show();
    this.currResults = [];
    let val = ev.target.value;
    if(!val || val.length <= 2) {
      this.linhas = this.busamService.getLinhas(this.cidade).subscribe(
        response => {
          this.item = response;
          let favoritas:any = JSON.parse(window.localStorage.getItem('linha_favoritas'));
          if(favoritas) {
            this.item.map((linha, index) => {
              linha.favorita = false;
              if(favoritas.indexOf(linha.idLinha) !== -1) {
                linha.favorita = true;
              }
            })
          }
          this.loadingComponent.hide();
        },
        error => {
          console.log("erro", "Ocorreu um erro. Tente novamente.");
        });
    } else if (val && val.trim() != '' && val.length > 2) {
      this.busamService.getLinhas(this.cidade).subscribe(response => {
        this.item = response.filter((item) => {
          return (item.nomeLinha.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }, error => {})
    }
  }

  ionViewDidLoad() {}



  viewFavoritos() {
    this.navCtrl.push(HorariosFavoritosPage, {});
  }


  viewItem(item) {
    this.navCtrl.push(LinhasPage, {
      item: item
    });
  }

  backStart(){
    this.busamService.resetaCidade();
    this.navCtrl.push(StartPage, {});
  }

}
