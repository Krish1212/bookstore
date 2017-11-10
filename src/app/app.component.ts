import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { NgauthProvider } from '../providers/ngauth/ngauth';
import { HomePage } from '../pages/home/home';
import { UprofilePage } from '../pages/uprofile/uprofile';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  username:string;
  firstName:string;
  gender:string;
  pages:Array<{title:string, component:any}>;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    afAuth: AngularFireAuth, 
    private ngAuth: NgauthProvider,
    private events:Events) {
    this.pages = [
      { title: 'My Profile', component: UprofilePage },
      { title: 'About', component: AboutPage },
      { title: 'Contact', component: ContactPage },
    ];
    this.events.subscribe("myprofile", (userProfile) => {
      this.username = userProfile.username;
      this.firstName = userProfile.firstName;
      this.gender = userProfile.gender;
    });
    const authObserver = afAuth.authState.subscribe(user => {
      if (!user) {
        this.rootPage = 'login';
        authObserver.unsubscribe();
      } else {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  logout(){
    this.ngAuth.userSignOut();
    this.nav.setRoot('login');
  }
  openPage(page){
    //console.log('from home: ' + page.component);
    this.nav.push(page.component);
  }
}