import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
<<<<<<< HEAD
import { Http } from '../http-api';
import { HttpModule} from '@angular/http';
=======
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AnnouncementsPage } from '../pages/announcements/announcements';
=======
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage,
    LoginPage,
    AnnouncementsPage,
    RegisterPage
=======
    ListPage
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
<<<<<<< HEAD
    HttpModule
=======
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage,
    LoginPage,
    AnnouncementsPage,
    RegisterPage
=======
    ListPage
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Http
=======
    {provide: ErrorHandler, useClass: IonicErrorHandler}
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f
  ]
})
export class AppModule {}
