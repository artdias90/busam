import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { TipsPage } from '../pages/tips/tips';
import { HorariosFavoritosPage } from '../pages/horarios-favoritos/horarios-favoritos';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { RegisterPage } from '../pages/register/register';
import { LinhasPage } from '../pages/linhas/linhas';
import { StartPage } from '../pages/start/start';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ProfilePage,
    TabsPage,
    LoginPage,
    TipsPage,
    HorariosFavoritosPage,
    PasswordResetPage,
    RegisterPage,
    LinhasPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ProfilePage,
    TabsPage,
    TipsPage,
    LoginPage,
    HorariosFavoritosPage,
    PasswordResetPage,
    RegisterPage,
    LinhasPage,
    StartPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
