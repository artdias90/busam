import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StartPage } from '../pages/start/start';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = StartPage;
  
  constructor(platform: Platform) {
    platform.ready().then(() => {

    });
  }
}
