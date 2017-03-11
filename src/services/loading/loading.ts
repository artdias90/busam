import {Component, Injectable} from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadingComponent {
  public loader:any;
  constructor(public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "aguarde...",
    });
  }

  public show() {
    this.loader.present();
  }

  public hide() {
    this.loader.dismiss();
  }
}
