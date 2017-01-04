import {Component} from '@angular/core';
import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {AuthService} from "../../services/auth/auth";
import {Http} from '@angular/http';
import {ImageUploadService} from "../../services/image-upload/image-upload";
import {LoginPage} from '../login/login';
import {GlobalVars} from "../../services/globals/globals";

@Component({
  templateUrl: 'profile.html',
  providers: [AuthService, ImageUploadService, GlobalVars]
})
export class ProfilePage {
  public loggedInUserInfo: any;
  public user: any;
  public fotoSrc: string;
  public userName: string;
  items: any;
  localCheckState : any;
  hostUser: any;

  constructor(
    GlobalVars: GlobalVars,
    private navCtrl: NavController,
    private http: Http,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private actionSheet: ActionSheetController,
    private imageUploadService: ImageUploadService
  ){
    this.user = {foto: '', nome: ''};
    this.hostUser = GlobalVars.hostUser;
  }

  ionViewWillEnter() {
    this.loggedInUserInfo = this.authService.getCurrent();
    if(!this.loggedInUserInfo) {
      this.navCtrl.push(LoginPage);
    }
    else {
      this.authService.getUser(this.loggedInUserInfo.id).subscribe(
        response => {
          this.user = response[0];
          if(this.user) {
            this.fotoSrc = this.hostUser + 'fotos/' + this.user.FotoUser;
            this.userName = this.user.NomeUser;
            this.localCheckState = this.user.notificacaoUser;
          } else {
            this.logout();
          }
        },
        error => {
          this.alerta("erro", "Ocorreu um erro. Tente novamente.");
        });
    }
  }

  public alerta(titulo, mensagem){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  public logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheet.create({
      title: 'Foto de perfil',
      buttons: [
        {
          text: 'Tirar Foto...',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Foto do arquivo...',
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'Deletar Foto',
          handler: () => {
            this.deletePicture();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture() {
    this.imageUploadService.takePicture().then(
      image =>{
        this.user.foto = image;
        this.fotoSrc = "data:image/jpeg;base64," + image;
        this.updateProfilePic();
      }
    )
  };

  public getPicture() {
    this.imageUploadService.getPicture().then(
      image =>{
        this.user.foto = image;
        this.fotoSrc = "data:image/jpeg;base64," + image;
        this.updateProfilePic();
      }
    )
  }

  public deletePicture() {
    this.http.get(this.hostUser + 'deletar-profile-foto.php?id=' + this.loggedInUserInfo.id)
    .subscribe(data => {
      this.fotoSrc = null;
      this.alerta("Foto deletada!", "Sua foto foi deletada com sucesso!");
    }, error => {
      this.alerta("erro", "Ocorreu um erro. Tente novamente.");
    });
  }

  public updateProfilePic() {
    if (this.fotoSrc) {
      var link = this.hostUser + 'profile-foto.php';
      var data = JSON.stringify({imagem: this.user.foto, usuario: this.loggedInUserInfo.id});
      this.http.post(link, data)
        .subscribe(data => {
          this.items = data.json();
          this.http.get(this.hostUser + 'salvar-profile-foto.php?imagem=' + this.items.caminho + '&usuario=' + this.items.usuario)
            .subscribe(data => {
              this.alerta("Foto Atualizada!", "Parabéns, sua foto foi atualizada com sucesso!");
            }, error => {
              this.alerta("erro", "Ocorreu um erro. Tente novamente.");
            });
        }, error => {
          this.alerta("erro", "Ocorreu um erro. Tente novamente.");
        });
    }
  }


}
