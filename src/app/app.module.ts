import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { NgauthProvider } from '../providers/ngauth/ngauth';
import { ShareProvider } from '../providers/share/share';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UprofilePage } from '../pages/uprofile/uprofile';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { BooksProvider } from '../providers/books/books';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UprofilePage,
    AboutPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UprofilePage,
    AboutPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NgauthProvider,
    ShareProvider,
    BooksProvider
  ]
})
export class AppModule {}
