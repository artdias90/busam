import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from "../../services/auth/auth";
import { GlobalVars } from "../../services/globals/globals";
import { BusamService } from "../../services/busam/busam";
import { LinhasPage } from "../linhas/linhas";
import { StartPage } from "../start/start";
import { LoadingComponent } from "../../services/loading/loading";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HorariosFavoritosPage } from '../horarios-favoritos/horarios-favoritos';


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
  people;
  cidade;
  searchBarItem;
  banner_campinas;
  private options = { name: "data12.db", location: 'default', createFromLocation: 1 };
  public names: String[] = [];
  constructor(GlobalVars:GlobalVars,
              private platform:Platform,
              private navCtrl:NavController,
              private http:Http,
              private authService:AuthService,
              private alertCtrl:AlertController,
              private loadingComponent:LoadingComponent,
              private busamService:BusamService,
              private sqlite: SQLite) {
    this.cidade = this.busamService.verificaCidade();
    if(this.cidade == 2) {
      this.banner_campinas = true;
    } else {
      this.banner_campinas = false;
    }

    this.platform.ready().then(() => {
      this.loadingComponent.show();
      this.sqlite.create(this.options).then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM linhas WHERE cidadeLinha = " + this.cidade + " ORDER BY idLinha", {}).then((data) => {
          this.people = [];
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              this.people.push({idLinha: data.rows.item(i).idLinha, nomeLinha: data.rows.item(i).nomeLinha, numeroLinha: data.rows.item(i).numeroLinha});
            }
          } else {
            console.log("zerado");
          }
          this.loadingComponent.hide();
          this.item = JSON.stringify(this.people);
        }).catch(e => console.log(e));
      });
    });
  }

  // favorita uma linha para que ela fique sempre no topo
  favoritar(event:any, item:any) {
    item.favorita = !item.favorita;
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
