import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { LinhasPage } from '../pages/linhas/linhas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    LinhasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HomePage,
    LinhasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}