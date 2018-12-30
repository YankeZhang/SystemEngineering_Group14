import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ChartsModule } from 'ng2-charts'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { LoginPage } from '../pages/login/login';

const firebase = {
    apiKey: "AIzaSyAfe-IA_oEU-dxBj1nv2cx1Rvokso3wWak",
    authDomain: "ionicproject-8a63d.firebaseapp.com",
    databaseURL: "https://ionicproject-8a63d.firebaseio.com",
    projectId: "ionicproject-8a63d",
    storageBucket: "ionicproject-8a63d.appspot.com",
    messagingSenderId: "1001437066757"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    BluetoothPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ChartsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    BluetoothPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
