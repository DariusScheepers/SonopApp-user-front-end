import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http } from '../http-api';
import { HttpModule} from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AnnouncementsPage } from '../pages/announcements/announcements';
import { AnnouncementsAddPage } from '../pages/announcements-add/announcements-add';
import { WeekendPage } from '../pages/weekend/weekend';
import { SignOutPage } from '../pages/sign-out/sign-out';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AnnouncementsPage,
    AnnouncementsAddPage,
    RegisterPage,
    WeekendPage,
    SignOutPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AnnouncementsPage,
    AnnouncementsAddPage,
    RegisterPage,
    WeekendPage,
    SignOutPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Http,
    HTTP,
    GlobalProvider,
    LocalNotifications
  ]
})
export class AppModule {}
