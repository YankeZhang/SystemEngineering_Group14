import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ReminderPage } from '../pages/reminder/reminder';
import { DetailPage}  from '../pages/detail/detail';
import { ContactDetailsPage }  from '../pages/contact-details/contact-details'
import { BluetoothPage } from '../pages/bluetooth/bluetooth';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ReminderPageModule } from '../pages/reminder/reminder.module';

import { ChartsModule } from 'ng2-charts'
import { BLE } from '@ionic-native/ble';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

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
    TabsPage,
    DetailPage,
    ReminderPage,
    ContactDetailsPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ChartsModule,
    //LocalNotifications
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ReminderPage,
    BluetoothPage,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    ContactDetailsPage,
    TabsPage
  ],
  providers: [
    BLE,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    BluetoothLE
  ]
})
export class AppModule {}
