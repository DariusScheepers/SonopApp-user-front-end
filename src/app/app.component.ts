import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
import { AnnouncementsPage } from '../pages/announcements/announcements';
=======
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

<<<<<<< HEAD
  rootPage: any = LoginPage; // LoginPage // HomePage
=======
  rootPage: any = HomePage;
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
<<<<<<< HEAD
      { title: 'List', component: ListPage },
      { title: 'Announcements', component: AnnouncementsPage }
=======
      { title: 'List', component: ListPage }
>>>>>>> 1d4376261b0c70109c709e4ecac9dfd29e38e90f
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
